import { getTranslations } from "next-intl/server";
import { RemaFAQ } from "@/components/rema/RemaInfo";
import { FAQ_KEYS, remaMetadata } from "@/lib/rema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return remaMetadata(locale, "faq");
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "rema.faq" });
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_KEYS.map((key) => ({
      "@type": "Question",
      name: t("items." + key + ".question"),
      acceptedAnswer: { "@type": "Answer", text: t("items." + key + ".answer") },
    })),
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><RemaFAQ locale={locale} /></>;
}
