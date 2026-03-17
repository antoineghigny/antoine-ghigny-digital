import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "fr"],

  // Used when no locale matches
  defaultLocale: "fr",
  
  // Disable automatic locale detection to respect defaultLocale
  localeDetection: false
});

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files (_next, images, favicon, etc.)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
