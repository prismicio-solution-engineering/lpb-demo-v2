import type { NextRequest } from "next/server";

/**
 * A record of locales mapped to a version displayed in URLs. The first entry is
 * used as the default locale.
 */

const LOCALES = {
  "ar-eg": "ar-eg",
  "de-de": "de-de",
  "el-gr": "el-gr",
  "en-us": "en-us",
  "es-es": "es-es",
  "fr-fr": "fr-fr",
};

const DEFAULT_LOCALE = "en-us";

/** Creates a redirect with the default locale prepended to the URL. */
export async function createLocaleRedirect(
  request: NextRequest,
): Promise<Response> {
  const pathname = request.nextUrl.pathname;

  // Always prepend the default locale when none is present
  request.nextUrl.pathname =
    pathname === "/"
      ? `/${LOCALES[DEFAULT_LOCALE]}`
      : `/${LOCALES[DEFAULT_LOCALE]}${pathname}`;

  return Response.redirect(request.nextUrl);
}

/** Determines if a pathname has a locale as its first segment. */
export function pathnameHasLocale(request: NextRequest): boolean {
  const regexp = new RegExp(`^/(${Object.values(LOCALES).join("|")})(\/|$)`);
  return regexp.test(request.nextUrl.pathname);
}

/**
 * Returns the full locale of a given locale. It returns `undefined` if the
 * locale is not in the master list.
 */
export function reverseLocaleLookup(locale: string): string | undefined {
  for (const [key, value] of Object.entries(LOCALES)) {
    if (value === locale) {
      return key;
    }
  }
}
