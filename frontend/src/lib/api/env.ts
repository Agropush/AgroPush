const DEFAULT_API_BASE_URL = "http://localhost:4000";

export function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_BASE_URL;
}

export function getStellarRpcUrl(): string {
  return (
    process.env.NEXT_PUBLIC_STELLAR_RPC_URL ||
    process.env.NEXT_PUBLIC_RPC_URL ||
    "https://soroban-testnet.stellar.org"
  );
}

export function getStellarNetworkPassphrase(): string {
  return (
    process.env.NEXT_PUBLIC_STELLAR_NETWORK ||
    "Test SDF Network ; September 2015"
  );
}

/**
 * Mirrors the backend's DEMO_MODE: the backend returns placeholder XDRs
 * (no deployed contract required), so real transactions built off them
 * can never submit successfully to the live Stellar RPC. In demo mode,
 * chain confirmation is simulated server-side (an admin transitions trade
 * status directly) rather than by a real network submission.
 */
export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE === "true";
}
