import { getTranslations } from "next-intl/server";
import LegalContent from "@/components/landing/LegalContent";

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
  };
}

export default function LegalPage() {
  return <LegalContent />;
}
