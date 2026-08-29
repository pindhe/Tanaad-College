import { NextResponse } from "next/server";
import { isLocale, LOCALE_COOKIE } from "@/i18n/config";

export async function POST(request: Request) {
  const body = (await request.json()) as { locale?: string };
  if (!isLocale(body.locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(LOCALE_COOKIE, body.locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return response;
}
