import { cookies } from "next/headers";
import { defaultLocale, isLocale, LOCALE_COOKIE, type AppLocale } from "@/i18n/config";

export async function getLocale(): Promise<AppLocale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
}
