import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => ({
  locale: locale || "fr",
  messages: (await import(`../../messages/${locale || "fr"}.json`)).default,
  timeZone: "Europe/Brussels", // Added to resolve ENVIRONMENT_FALLBACK
}));
