export const locales = ["en", "so", "ar"] as const;
export const defaultLocale = "en";
export const rtlLocales = ["ar"] as const;
export const LOCALE_COOKIE = "tanaad-locale";

export type AppLocale = (typeof locales)[number];

export function isLocale(value: string | undefined): value is AppLocale {
  return Boolean(value && locales.includes(value as AppLocale));
}

export function isRtl(locale: AppLocale): boolean {
  return rtlLocales.includes(locale as (typeof rtlLocales)[number]);
}
