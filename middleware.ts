import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale, isRtl, LOCALE_COOKIE } from "@/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const localeCookie = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(localeCookie) ? localeCookie : defaultLocale;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);
  requestHeaders.set("x-dir", isRtl(locale) ? "rtl" : "ltr");
  requestHeaders.set("x-pathname", pathname);

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie =
      request.cookies.get("authjs.session-token") ??
      request.cookies.get("__Secure-authjs.session-token");

    if (!sessionCookie) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  if (!localeCookie) {
    response.cookies.set(LOCALE_COOKIE, defaultLocale, { path: "/" });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth|api/files).*)"],
};
