import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const REMA_URL = "https://antoineghigny.be";
export const REMA_EMAIL = "contact@antoineghigny.be";
export const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"] as const;

export async function remaMetadata(locale: string, page: "about" | "faq" | "legal" | "privacy"): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `rema.${page}` });
  const url = `${REMA_URL}/${locale}/${page}`;
  const title = t("title");
  const description = page === "about" || page === "faq" ? t("description") : t("intro");

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { fr: `${REMA_URL}/fr/${page}`, en: `${REMA_URL}/en/${page}` },
    },
    openGraph: { title: `${title} | Rema`, description, url, images: [`/rema/social-${locale}.png`] },
    twitter: { title: `${title} | Rema`, description, images: [`/rema/social-${locale}.png`] },
    robots: { index: page === "about" || page === "faq", follow: true },
  };
}
