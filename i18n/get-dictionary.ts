import { defaultLocale, type AppLocale } from "@/i18n/config";
import en from "@/messages/en.json";
import so from "@/messages/so.json";
import ar from "@/messages/ar.json";

const dictionaries = { en, so, ar };

export type Dictionary = typeof en;

export function getDictionary(locale: AppLocale = defaultLocale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
