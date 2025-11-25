import type { NextRequest } from "next/server";
import { createClient } from "./prismicio";

const client = createClient();
const repository = await client.getRepository();

/**
 * A record of locales mapped to a version displayed in URLs. The first entry is
 * used as the default locale.
 */
const LOCALES = repository.languages.reduce((acc, lang) => {
  acc[lang.id] = lang.id;
  return acc;
}, {} as Record<string, string>);

const locales = Object.keys(LOCALES);
const DEFAULT_LOCALE = locales[0]; // "en-us" if that is first in Prismic

/** Creates a redirect with the default locale prepended to the URL. */
export async function createLocaleRedirect(
  request: NextRequest,
): Promise<Response> {
  const pathname = request.nextUrl.pathname;

  // Always prepend the default locale when none is present
  // "/" -> "/en-us"
  // "/my-page" -> "/en-us/my-page"
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
  for (const key in LOCALES) {
    if (LOCALES[key] === locale) {
      return key;
    }
  }
}
