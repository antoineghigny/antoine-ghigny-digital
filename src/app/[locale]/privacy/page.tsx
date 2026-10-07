import { RemaPrivacy } from "@/components/rema/RemaInfo";
import { remaMetadata } from "@/lib/rema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return remaMetadata(locale, "privacy");
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <RemaPrivacy locale={locale} />;
}
