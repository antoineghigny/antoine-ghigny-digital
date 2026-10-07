import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = requested === "en" ? "en" : "fr";
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const rema = (await import(`../../messages/rema-${locale}.json`)).default;

  return {
    locale,
    messages: { ...messages, rema },
    timeZone: "Europe/Brussels",
  };
});
