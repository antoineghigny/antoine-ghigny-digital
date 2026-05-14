import { getTranslations } from "next-intl/server";
import LegalContent from "@/components/landing/LegalContent";

const BASE_URL = "https://antoineghigny.be";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });

  return {
    title: t("title"),
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/legal`,
      languages: {
        fr: `${BASE_URL}/fr/legal`,
        en: `${BASE_URL}/en/legal`,
      },
    },
  };
}

export default function LegalPage() {
  return <LegalContent />;
}
