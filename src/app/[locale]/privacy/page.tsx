import { getTranslations } from "next-intl/server";
import PrivacyContent from "@/components/landing/PrivacyContent";

const BASE_URL = "https://antoineghigny.be";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return {
    title: t("title"),
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/privacy`,
      languages: {
        fr: `${BASE_URL}/fr/privacy`,
        en: `${BASE_URL}/en/privacy`,
      },
    },
  };
}

export default function PrivacyPage() {
  return <PrivacyContent />;
}
