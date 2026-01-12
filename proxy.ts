import { NextRequest } from "next/server";
import { createLocaleRedirect, pathnameHasLocale } from "@/i18n";

export async function proxy(request: NextRequest) {
  if (!pathnameHasLocale(request)) {
    return createLocaleRedirect(request);
  }
}

export const config = {
  // Don’t change the URL of Next.js assets starting with _next
  matcher: ["/((?!_next|api|slice-simulator|icon.svg|slice-library|favicon.ico).*)"],
};
