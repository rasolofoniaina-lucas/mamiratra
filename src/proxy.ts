import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { hasLocale } from "next-intl";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // The first visit is always French; a deliberate choice is remembered.
  if (request.nextUrl.pathname === "/") {
    const savedLocale = request.cookies.get("NEXT_LOCALE")?.value;
    const locale = hasLocale(routing.locales, savedLocale)
      ? savedLocale
      : routing.defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
