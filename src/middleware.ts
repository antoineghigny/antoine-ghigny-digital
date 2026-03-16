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
  // Match only internationalized pathnames
  matcher: ["/", "/(en|fr)/:path*"],
};
