import RemaHome from "@/components/rema/RemaHome";
import JsonLd from "@/components/JsonLd";

export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <><JsonLd locale={locale} /><RemaHome locale={locale} /></>;
}
