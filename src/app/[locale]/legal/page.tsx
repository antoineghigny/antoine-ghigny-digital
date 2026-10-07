import { RemaLegal } from "@/components/rema/RemaInfo";
import { remaMetadata } from "@/lib/rema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return remaMetadata(locale, "legal");
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <RemaLegal locale={locale} />;
}
