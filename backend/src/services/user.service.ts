import { getSupabaseClient } from "../lib/supabase";
import { prisma as defaultPrisma } from "../lib/db";
import { UpdateProfileInput, updateProfileSchema } from "../validators/user.validators";
import { AppError, ErrorCode } from "../errors/errorCodes";
import { StrKey } from "@stellar/stellar-sdk";

/**
 * Find a user by wallet address or create a new one if not exists.
 * Used during authentication flow.
 *
 * Trade.buyerAddress/sellerAddress have foreign keys against the app's own
 * Postgres User table, which nothing else populates — so when Supabase isn't
 * configured (the documented default: SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY
 * are blank in .env.example), fall back to upserting there directly instead
 * of failing every login. When Supabase *is* configured, behavior/shape is
 * unchanged from before.
 */
export async function findOrCreateUser(address: string) {
  if (!StrKey.isValidEd25519PublicKey(address)) {
    throw new AppError(ErrorCode.VALIDATION_ERROR, 'Invalid Stellar public key', 400);
  }

  const normalizedAddress = address.toLowerCase();

  let supabase;
  try {
    supabase = getSupabaseClient();
  } catch {
    // db.ts's $use middleware lowercases User.walletAddress/Trade.buyerAddress/
    // sellerAddress on write — but only for `.create()`/`.update()` calls
    // (it inspects params.args.data, which upsert doesn't use — upsert's args
    // are {where, create, update}, so it silently bypasses the middleware).
    // Lowercase explicitly here so this row matches what Trade rows will
    // actually have stored once the middleware processes their create() call.
    return defaultPrisma.user.upsert({
      where: { walletAddress: normalizedAddress },
      update: {},
      create: { walletAddress: normalizedAddress, displayName: normalizedAddress },
    });
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("address", normalizedAddress)
      .single();

    if (error && error.code === "PGRST116") {
      // Not found — auto-create
      const { data: created, error: createError } = await supabase
        .from("users")
        .insert({ address: normalizedAddress })
        .select()
        .single();

      // Another request may have inserted the same address after our initial read.
      if (createError?.code === "23505") {
        const { data: existing, error: existingError } = await supabase
          .from("users")
          .select("*")
          .eq("address", normalizedAddress)
          .single();

        if (!existingError && existing) {
          return existing;
        }
      }

      if (createError) {
        throw new AppError(ErrorCode.INFRA_ERROR, 'Failed to create user record', 500);
      }
      return created;
    }

    if (error) {
      throw new AppError(ErrorCode.INFRA_ERROR, 'PostgreSQL query failed', 500);
    }

    return data;
  } catch (error: any) {
    if (error.name === 'AppError') throw error;
    throw new AppError(ErrorCode.INFRA_ERROR, 'User service dependency failure', 503);
  }
}

/**
 * Update user profile details.
 */
export async function updateUser(address: string, input: UpdateProfileInput) {
  if (!StrKey.isValidEd25519PublicKey(address)) {
    throw new AppError(ErrorCode.VALIDATION_ERROR, 'Invalid Stellar public key', 400);
  }

  // Validate input schema
  const validation = updateProfileSchema.safeParse(input);
  if (!validation.success) {
    throw new AppError(ErrorCode.VALIDATION_ERROR, 'Invalid profile data', 400);
  }

  const supabase = getSupabaseClient();
  const normalizedAddress = address.toLowerCase();

  try {
    const { data, error } = await supabase
      .from("users")
      .update({ 
        display_name: input.displayName,
        avatar_url: input.avatarUrl,
        updated_at: new Date().toISOString() 
      })
      .eq("address", normalizedAddress)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        throw new AppError(ErrorCode.NOT_FOUND, 'User not found', 404);
      }
      throw new AppError(ErrorCode.INFRA_ERROR, 'Update failed', 500);
    }

    return data;
  } catch (error: any) {
    if (error.name === 'AppError') throw error;
    throw new AppError(ErrorCode.INFRA_ERROR, 'User update failed', 503);
  }
}

/**
 * Get public profile details for any user.
 */
export async function getPublicProfile(address: string) {
  if (!StrKey.isValidEd25519PublicKey(address)) {
    throw new AppError(ErrorCode.VALIDATION_ERROR, 'Invalid Stellar public key', 400);
  }

  const supabase = getSupabaseClient();
  const normalizedAddress = address.toLowerCase();

  try {
    const { data, error } = await supabase
      .from("users")
      .select("address, display_name, avatar_url, created_at")
      .eq("address", normalizedAddress)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new AppError(ErrorCode.INFRA_ERROR, 'Fetch failed', 500);
    }

    return data;
  } catch (error: any) {
    if (error.name === 'AppError') throw error;
    throw new AppError(ErrorCode.INFRA_ERROR, 'User service dependency failure', 503);
  }
}
