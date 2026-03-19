import HeroAndWhy from "@/components/landing/HeroAndWhy";
import ArtisanSection from "@/components/landing/ArtisanSection";
import WhyMeSection from "@/components/landing/WhyMeSection";
import ContactFooter from "@/components/landing/ContactFooter";
import JsonLd from "@/components/JsonLd";

export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <JsonLd locale={locale} />
      <main className="bg-[#FAF8F5] dark:bg-[#1A1816] text-[#2D2926] dark:text-[#FAF8F5] selection:bg-[#B34B44]/20 selection:text-[#B34B44] overflow-x-hidden">
        <HeroAndWhy />
        <ArtisanSection />
        <WhyMeSection />
        <ContactFooter />
      </main>
    </>
  );
}
