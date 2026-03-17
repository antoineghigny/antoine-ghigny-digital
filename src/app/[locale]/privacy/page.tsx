"use client";

import React from "react";
import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "@phosphor-icons/react";

const SPRING_TRANSITION = { type: "spring" as const, stiffness: 100, damping: 20 };
const FADE_UP_VARIANTS = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { ...SPRING_TRANSITION, duration: 0.8 } },
};

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacy");

  return (
    <main className="min-h-[100dvh] bg-[#FAF8F5] text-[#2D2926] selection:bg-[#B34B44]/20 selection:text-[#B34B44] font-sans pb-32">
      {/* Navigation Layer */}
      <nav className="max-w-[1400px] mx-auto px-4 md:px-12 py-10">
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={SPRING_TRANSITION}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-sm font-medium text-[#5C5652] hover:text-[#B34B44] transition-colors duration-300"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#2D2926]/10 group-hover:border-[#B34B44]/30 group-hover:bg-white transition-all duration-300 group-active:scale-[0.95]">
              <ArrowLeft size={18} weight="bold" />
            </div>
            {t("backToHome")}
          </Link>
        </m.div>
      </nav>

      <section className="max-w-[1400px] mx-auto px-4 md:px-12">
        {/* Hero Section */}
        <header className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 mb-24 md:mb-40">
          <m.div 
            className="md:col-start-1 md:col-span-10 lg:col-span-8"
            variants={FADE_UP_VARIANTS}
            initial="initial"
            animate="animate"
          >
            <span className="text-xs uppercase tracking-widest font-medium text-[#B34B44] mb-6 block">
              {t("label")}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-12">
              {t("title")}
            </h1>
            <p className="text-xl md:text-2xl text-[#5C5652] leading-relaxed font-light max-w-[65ch]">
              {t("intro")}
            </p>
          </m.div>
        </header>

        {/* Content Body */}
        <div className="space-y-24 md:space-y-32">
          {/* Section: Controller */}
          <PrivacySection 
            label={t("sections.controller.label")}
            title={t("sections.controller.title")}
          >
            <div className="space-y-4 text-lg md:text-xl text-[#5C5652] leading-relaxed font-light">
              <p>{t("sections.controller.content")}</p>
              <p className="text-[#B34B44]">{t("sections.controller.email")}</p>
            </div>
          </PrivacySection>

          {/* Section: Data Collected */}
          <PrivacySection 
            label={t("sections.data.label")}
            title={t("sections.data.title")}
          >
            <p className="text-lg md:text-xl text-[#5C5652] leading-relaxed font-light">
              {t("sections.data.content")}
            </p>
          </PrivacySection>

          {/* Section: Rights */}
          <PrivacySection 
            label={t("sections.rights.label")}
            title={t("sections.rights.title")}
          >
            <p className="text-lg md:text-xl text-[#5C5652] leading-relaxed font-light">
              {t("sections.rights.content")}
            </p>
          </PrivacySection>

          {/* Section: Cookies */}
          <PrivacySection 
            label={t("sections.cookies.label")}
            title={t("sections.cookies.title")}
          >
            <p className="text-lg md:text-xl text-[#5C5652] leading-relaxed font-light">
              {t("sections.cookies.content")}
            </p>
          </PrivacySection>

          {/* Final CTA */}
          <m.footer 
            className="pt-20 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-[#5C5652] tracking-tight">
              © {new Date().getFullYear()} Antoine Ghigny — {t("allRightsReserved")}
            </p>
            <Link
              href="/#contact"
              className="bg-[#B34B44] text-white px-10 py-5 rounded-full font-medium text-lg shadow-lg shadow-[#B34B44]/20 hover:bg-[#963f39] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto text-center"
            >
              {t("returnCTA")}
            </Link>
          </m.footer>
        </div>
      </section>
    </main>
  );
}

interface PrivacySectionProps {
  label: string;
  title: string;
  children: React.ReactNode;
}

function PrivacySection({ label, title, children }: PrivacySectionProps) {
  return (
    <m.section 
      className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ ...SPRING_TRANSITION, duration: 1 }}
    >
      <div className="md:col-span-5 flex flex-col">
        <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#B34B44] mb-4">
          {label}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#2D2926]">
          {title}
        </h2>
        <div className="hidden md:block w-12 h-[1px] bg-[#B34B44]/30 mt-8" />
      </div>

      <div className="md:col-span-7">
        <div className="md:pl-4">
          {children}
        </div>
      </div>
    </m.section>
  );
}