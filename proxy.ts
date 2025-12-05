import { NextRequest, NextResponse } from "next/server";
import { createLocaleRedirect, pathnameHasLocale } from "@/i18n";

// import { createClient } from "@/prismicio";
// import { match } from "@formatjs/intl-localematcher";
// import Negotiator from "negotiator";

// const client = createClient();

// async function getLocale(request) {
//   const headers = { "accept-language": request.headers.get("accept-language") };
//   const languages = new Negotiator({ headers }).languages();
//   console.log("Detected languages:", languages);

//   const repository = await client.getRepository();
//   // const LOCALES = repository.languages.map((lang) => ({[lang.id] : lang.id}));
//   const LOCALES = repository.languages.reduce((acc, lang) => {
//     acc[lang.id] = lang.id;
//     return acc;
//   }, {});
//   // console.log("LOCALES from repository:", LOCALES);
//   const locales = Object.keys(LOCALES);
//   // console.log("Supported locales:", locales);
//   const defaultLocale = repository.languages.find((lang) => lang.is_master)?.id;
//   // console.log("Default locale:", defaultLocale);

//   return match(languages, locales, defaultLocale);
// }

// export async function proxy(request) {
//   const { pathname } = request.nextUrl;

//   // REWRITES LOCALES
//   const repository = await client.getRepository();
//   const locales = repository.languages.map((lang) => ({ [lang.id]: lang.id }));
//   const defaultLocale = repository.languages.find((lang) => lang.is_master)?.id;

//   const pathnameHasLocale = locales.some(
//     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   );

//   if (pathnameHasLocale) return;

//   // Redirect if there is no locale
//   const locale = await getLocale(request);
//   console.log("Chosen locale:", locale);
//   request.nextUrl.pathname = `/${locale}${pathname}`;
//   // e.g. incoming request is /products
//   // The new URL is now /en-US/products
//   return NextResponse.redirect(request.nextUrl);

//   // //Show root "en-us" page if root page asked
//   // return NextResponse.rewrite(
//   //   new URL('/en-us', request.url)
//   // );
// }

export async function proxy(request: NextRequest) {
  if (!pathnameHasLocale(request)) {
    return createLocaleRedirect(request);
  }

}

export const config = {
  // Don’t change the URL of Next.js assets starting with _next
  matcher: ["/((?!_next|api|slice-simulator|icon.svg|slice-library).*)"],
};
