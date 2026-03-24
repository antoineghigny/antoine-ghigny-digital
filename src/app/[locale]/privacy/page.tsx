import { getTranslations } from "next-intl/server";
import PrivacyContent from "@/components/landing/PrivacyContent";

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
  };
}

export default function PrivacyPage() {
  return <PrivacyContent />;
}
