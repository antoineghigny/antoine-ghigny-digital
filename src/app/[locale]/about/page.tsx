"use client";

import React from "react";
import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ContactCTALink from "@/components/ContactCTALink";
import {
  ArrowLeft,
  LinkedinLogo,
  Briefcase,
  GraduationCap,
  Code,
  Globe,
} from "@phosphor-icons/react";

const SPRING_TRANSITION = { type: "spring" as const, stiffness: 100, damping: 20 };
const FADE_UP_VARIANTS = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { ...SPRING_TRANSITION, duration: 0.8 } },
};

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <main className="min-h-[100dvh] bg-[#FAF8F5] dark:bg-[#1A1816] text-[#2D2926] dark:text-[#FAF8F5] selection:bg-[#B34B44]/20 selection:text-[#B34B44] font-sans pb-32">
      {/* Navigation Layer */}
      <nav className="max-w-[1400px] mx-auto px-4 md:px-12 py-10">
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={SPRING_TRANSITION}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-sm font-medium text-[#5C5652] dark:text-[#A8A29E] hover:text-[#B34B44] transition-colors duration-300"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#2D2926]/10 dark:border-white/10 group-hover:border-[#B34B44]/30 group-hover:bg-white dark:group-hover:bg-[#242220] transition-all duration-300 group-active:scale-[0.95]">
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
            <p className="text-xl md:text-2xl text-[#5C5652] dark:text-[#A8A29E] leading-relaxed font-light max-w-[65ch]">
              {t("sections.summary.content")}
            </p>
          </m.div>
        </header>

        {/* Content Sections */}
        <div className="space-y-24 md:space-y-32">
          {/* Technical Expertise */}
          <AboutSection
            label={t("sections.expertise.label")}
            title={t("sections.expertise.title")}
            icon={<Code size={20} weight="fill" className="text-[#B34B44]" />}
          >
            <div className="space-y-8">
              <div className="flex flex-col gap-4">
                <span className="text-sm font-medium text-[#B34B44] uppercase tracking-wider">
                  Backend & Infrastructure
                </span>
                <div className="flex flex-wrap gap-2">
                  {["Java", "Spring Boot", "Node.js", "Kafka", "Kubernetes", "Docker", "Terraform"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-stone-100 dark:bg-[#242220] border border-stone-200 dark:border-white/10 rounded-full text-sm text-[#5C5652] dark:text-[#A8A29E]"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-sm font-medium text-[#B34B44] uppercase tracking-wider">
                  Frontend & Design
                </span>
                <div className="flex flex-wrap gap-2">
                  {["Angular", "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-stone-100 dark:bg-[#242220] border border-stone-200 dark:border-white/10 rounded-full text-sm text-[#5C5652] dark:text-[#A8A29E]"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </AboutSection>

          {/* Experience Timeline */}
          <AboutSection
            label={t("sections.experience.label")}
            title={t("sections.experience.title")}
            icon={<Briefcase size={20} weight="fill" className="text-[#B34B44]" />}
          >
            <div className="flex flex-col">
              {/* Accenture */}
              <div className="grid grid-cols-[20px_1fr] gap-x-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-[#B34B44] border-4 border-[#FAF8F5] dark:border-[#1A1816] ring-1 ring-[#B34B44] mt-1 flex-shrink-0" />
                  <div className="w-px flex-1 bg-stone-200 dark:bg-white/10 mt-2" />
                </div>
                <div className="pb-16">
                  <span className="text-sm font-medium text-[#B34B44] block mb-2">
                    {t("sections.experience.accenture.date")}
                  </span>
                  <h3 className="text-xl font-bold text-[#2D2926] dark:text-[#FAF8F5] mb-1">
                    {t("sections.experience.accenture.role")}
                  </h3>
                  <p className="text-base text-[#5C5652] dark:text-[#A8A29E] font-medium mb-4">
                    {t("sections.experience.accenture.company")}
                  </p>
                  <p className="text-lg text-[#5C5652] dark:text-[#A8A29E] leading-relaxed font-light max-w-[60ch]">
                    {t("sections.experience.accenture.details")}
                  </p>
                </div>
              </div>

              {/* Proximus */}
              <div className="grid grid-cols-[20px_1fr] gap-x-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-stone-300 dark:bg-stone-600 border-4 border-[#FAF8F5] dark:border-[#1A1816] ring-1 ring-stone-300 dark:ring-stone-600 mt-1 flex-shrink-0" />
                </div>
                <div>
                  <span className="text-sm font-medium text-[#5C5652] dark:text-[#A8A29E] block mb-2">
                    {t("sections.experience.proximus.date")}
                  </span>
                  <h3 className="text-xl font-bold text-[#2D2926] dark:text-[#FAF8F5] mb-1">
                    {t("sections.experience.proximus.role")}
                  </h3>
                  <p className="text-base text-[#5C5652] dark:text-[#A8A29E] font-medium mb-4">
                    {t("sections.experience.proximus.company")}
                  </p>
                  <p className="text-lg text-[#5C5652] dark:text-[#A8A29E] leading-relaxed font-light max-w-[60ch]">
                    {t("sections.experience.proximus.details")}
                  </p>
                </div>
              </div>
            </div>
          </AboutSection>

          {/* Education */}
          <AboutSection
            label={t("sections.education.label")}
            title={t("sections.education.title")}
            icon={<GraduationCap size={20} weight="fill" className="text-[#B34B44]" />}
          >
            <div className="bg-stone-100/50 dark:bg-[#242220]/50 p-8 rounded-2xl border border-stone-200/50 dark:border-white/[0.07]">
              <span className="text-sm font-medium text-[#B34B44] block mb-2">
                {t("sections.education.date")}
              </span>
              <h3 className="text-xl font-bold text-[#2D2926] dark:text-[#FAF8F5] mb-1">
                {t("sections.education.degree")}
              </h3>
              <p className="text-base text-[#5C5652] dark:text-[#A8A29E] font-medium mb-4">
                {t("sections.education.school")}
              </p>
              <p className="text-lg text-[#5C5652] dark:text-[#A8A29E] leading-relaxed font-light max-w-[60ch]">
                {t("sections.education.details")}
              </p>
            </div>
          </AboutSection>

          {/* Languages */}
          <AboutSection
            label={t("sections.languages.label")}
            title={t("sections.languages.title")}
            icon={<Globe size={20} weight="fill" className="text-[#B34B44]" />}
          >
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[#B34B44] font-medium uppercase tracking-wider">
                  {t("sections.languages.french.label")}
                </span>
                <span className="text-lg font-bold">{t("sections.languages.french.level")}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[#B34B44] font-medium uppercase tracking-wider">
                  {t("sections.languages.english.label")}
                </span>
                <span className="text-lg font-bold">{t("sections.languages.english.level")}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[#B34B44] font-medium uppercase tracking-wider">
                  {t("sections.languages.dutch.label")}
                </span>
                <span className="text-lg font-bold">{t("sections.languages.dutch.level")}</span>
              </div>
            </div>
          </AboutSection>

          {/* LinkedIn CTA */}
          <m.div
            className="p-10 md:p-16 bg-[#2D2926] dark:bg-[#242220] rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...SPRING_TRANSITION, duration: 1 }}
          >
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {t("linkedin_cta.title")}
              </h2>
              <p className="text-stone-400 font-light max-w-[40ch]">
                {t("linkedin_cta.subtitle")}
              </p>
            </div>
            <a
              href="https://www.linkedin.com/in/antoine-ghigny-9b88a9252"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#B34B44] text-white px-10 py-5 rounded-full font-medium text-lg shadow-lg shadow-[#B34B44]/20 hover:bg-[#963f39] active:scale-[0.98] transition-all duration-300 flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              <LinkedinLogo
                size={24}
                weight="fill"
                className="group-hover:scale-110 transition-transform"
              />
              {t("linkedin_cta.button")}
            </a>
          </m.div>

          {/* Footer CTA */}
          <m.footer
            className="pt-20 border-t border-stone-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-[#5C5652] dark:text-[#A8A29E] tracking-tight">
              © {new Date().getFullYear()} Antoine Ghigny — {t("allRightsReserved")}
            </p>
            <ContactCTALink
              className="bg-[#B34B44] text-white px-10 py-5 rounded-full font-medium text-lg shadow-lg shadow-[#B34B44]/20 hover:bg-[#963f39] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto text-center"
            >
              {t("returnCTA")}
            </ContactCTALink>
          </m.footer>
        </div>
      </section>
    </main>
  );
}

interface AboutSectionProps {
  label: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

function AboutSection({ label, title, icon, children }: AboutSectionProps) {
  return (
    <m.section
      className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ ...SPRING_TRANSITION, duration: 1 }}
    >
      <div className="md:col-span-5 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#B34B44]">
            {label}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#2D2926] dark:text-[#FAF8F5]">
          {title}
        </h2>
        <div className="hidden md:block w-12 h-[1px] bg-[#B34B44]/30 mt-8" />
      </div>

      <div className="md:col-span-7">
        <div className="md:pl-4">{children}</div>
      </div>
    </m.section>
  );
}
