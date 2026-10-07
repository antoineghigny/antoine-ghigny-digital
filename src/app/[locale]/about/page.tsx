import { RemaAbout } from "@/components/rema/RemaInfo";
import { remaMetadata } from "@/lib/rema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return remaMetadata(locale, "about");
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <RemaAbout locale={locale} />;
}
