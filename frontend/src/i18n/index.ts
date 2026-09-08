import en from "./dictionaries/en";
import fr from "./dictionaries/fr";

export type Locale = "en" | "fr";

export type { TranslationKeys } from "./dictionaries/en";

const dictionaries = { en, fr } as const;

export function getDictionary(locale: Locale): Record<string, string> {
  return (dictionaries[locale] ?? dictionaries.en) as Record<string, string>;
}

export type T = Record<string, string>;

/**
 * Flat-key lookup for translation dictionaries (e.g. "nav.dashboard" is a
 * single key in the dictionary, not a nested path).
 */
export function t(
  dict: T,
  key: string,
  params?: Record<string, string | number>,
): string {
  const value = dict[key];
  if (typeof value !== "string") return key;
  if (!params) return value;
  return value.replace(/\{(\w+)\}/g, (_: string, name: string) =>
    params[name] !== undefined ? String(params[name]) : `{${name}}`,
  );
}

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  fr: "Fran\u00e7ais",
};
