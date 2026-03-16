"use client";

import HeroAndWhy from "@/components/landing/HeroAndWhy";
import WhyMeSection from "@/components/landing/WhyMeSection";
import ContactFooter from "@/components/landing/ContactFooter";

export default function LandingPage() {
  return (
    <main className="bg-[#FAF8F5] text-[#2D2926] selection:bg-[#B34B44]/20 selection:text-[#B34B44] overflow-x-hidden">
      <HeroAndWhy />
      <WhyMeSection />
      <ContactFooter />
    </main>
  );
}
