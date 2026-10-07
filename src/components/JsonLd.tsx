import { getTranslations } from "next-intl/server";
import { REMA_URL, REMA_EMAIL } from "@/lib/rema";

export default async function JsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "rema.metadata" });
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": REMA_URL + "/#person",
        name: "Antoine Ghigny",
        url: REMA_URL + "/" + locale + "/about",
        email: REMA_EMAIL,
        address: { "@type": "PostalAddress", addressLocality: "Nivelles", addressCountry: "BE" },
      },
      {
        "@type": "WebSite",
        "@id": REMA_URL + "/#website",
        name: "Rema",
        url: REMA_URL,
        description: t("description"),
        inLanguage: ["fr", "en"],
        publisher: { "@id": REMA_URL + "/#person" },
      },
      {
        "@type": "SoftwareApplication",
        "@id": REMA_URL + "/#rema",
        name: "Rema",
        operatingSystem: "iOS",
        applicationCategory: "LifestyleApplication",
        description: t("description"),
        url: REMA_URL + "/" + locale,
        image: REMA_URL + "/rema/mark.png",
        author: { "@id": REMA_URL + "/#person" },
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
