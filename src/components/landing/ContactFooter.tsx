"use client";

import React from "react";
import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { WhatsappLogo, Envelope, ChatCircleText } from "@phosphor-icons/react";
import { analytics } from "@/lib/analytics";
import Image from "next/image";

const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
};

export default function ContactFooter() {
  const t = useTranslations("contact");
  const tf = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAF8F5] dark:bg-[#1A1816] selection:bg-[#B34B44] selection:text-white">
      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 md:py-40 bg-white dark:bg-[#242220] rounded-t-[3rem] md:rounded-t-[5rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.03)] dark:shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.2)]"
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 w-full">
          <m.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.12, ...SPRING }}
            className="flex flex-col md:flex-row gap-16 md:gap-24 items-start"
          >
            {/* Left side: Heading */}
            <div className="flex-1 space-y-8">
              <m.span
                variants={fadeUp}
                className="text-sm uppercase tracking-[0.2em] font-bold text-[#B34B44] block"
              >
                {t("badge")}
              </m.span>

              {/* Dramatic masked title reveal */}
              <div className="overflow-hidden">
                <m.h2
                  initial={{ y: "105%", opacity: 0 }}
                  whileInView={{ y: "0%", opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.1, ease: [0.21, 0.45, 0.32, 0.9] }}
                  className="text-5xl md:text-8xl font-bold tracking-tight text-[#2D2926] dark:text-[#FAF8F5] leading-[0.95] lg:leading-[1.1] max-w-[12ch]"
                >
                  {t("title")}
                </m.h2>
              </div>
            </div>

            {/* Right side: Action */}
            <div className="flex-1 space-y-12 pt-4 md:pt-16">
              <m.div variants={fadeUp} className="space-y-4">
                <div className="flex items-center gap-2.5 text-[#B34B44]">
                  <ChatCircleText size={20} weight="fill" />
                  <span className="text-xs uppercase tracking-widest font-medium">{t("inquiry_label")}</span>
                </div>
                <m.p
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.25, ease: [0.21, 0.45, 0.32, 0.9] }}
                  className="text-xl md:text-2xl text-[#5C5652] dark:text-[#A8A29E] leading-relaxed font-light max-w-[40ch]"
                >
                  {t("description")}
                </m.p>
              </m.div>

              <m.div variants={fadeUp} className="space-y-8">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">

                  {/* WhatsApp button with radiating pulse rings */}
                  <div className="relative inline-flex">
                    {[0, 1, 2].map((i) => (
                      <m.span
                        key={i}
                        aria-hidden
                        className="absolute inset-0 rounded-full border border-[#B34B44]/50 pointer-events-none"
                        animate={{ scale: [1, 2.1], opacity: [0.55, 0] }}
                        transition={{
                          duration: 2.5,
                          delay: i * 0.8,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                    <m.a
                      href={`https://wa.me/${t("phone_url")}`}
                      onClick={() => analytics.whatsappClicked("footer")}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative z-10 inline-flex items-center justify-center gap-3 bg-[#B34B44] text-white px-8 py-5 rounded-full font-medium text-lg shadow-lg shadow-[#B34B44]/20 hover:bg-[#963f39] transition-all duration-300 group"
                    >
                      <WhatsappLogo weight="fill" size={24} />
                      <span>{t("cta_whatsapp")}</span>
                    </m.a>
                  </div>

                  <m.a
                    href={`mailto:${t("email")}?subject=${t("inquiry_label")}`}
                    onClick={() => analytics.emailClicked("footer")}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full font-medium text-lg border border-[#2D2926]/10 dark:border-white/10 text-[#2D2926] dark:text-[#FAF8F5] hover:bg-[#2D2926] hover:text-white transition-all duration-300"
                  >
                    <Envelope weight="fill" size={24} />
                    <span>{t("cta_mail")}</span>
                  </m.a>
                </div>

                <div className="flex items-center gap-3 px-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-sm text-[#5C5652] dark:text-[#A8A29E] font-medium tracking-wide">
                    {t("status")}
                  </p>
                </div>
              </m.div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Legal Footer */}
      <footer className="relative z-50 bg-[#FAF8F5] dark:bg-[#1A1816] py-16 border-t border-[#2D2926]/5 dark:border-white/[0.05]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-transparent.png"
                alt="Antoine Ghigny Digital"
                width={28}
                height={28}
                className="opacity-60"
              />
              <p className="text-xs text-[#5C5652] dark:text-[#A8A29E] tracking-widest font-medium uppercase opacity-80">
                {tf("copyright", { year: currentYear })}
              </p>
            </div>
            <div className="flex items-center gap-10">
              <Link
                href="/about"
                className="text-xs text-[#5C5652] hover:text-[#B34B44] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 tracking-widest font-medium uppercase inline-block"
              >
                {tf("links.about")}
              </Link>
              <span className="w-px h-3 bg-[#2D2926]/10 hidden md:block" />
              <Link
                href="/faq"
                className="text-xs text-[#5C5652] hover:text-[#B34B44] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 tracking-widest font-medium uppercase inline-block"
              >
                {tf("links.faq")}
              </Link>
              <span className="w-px h-3 bg-[#2D2926]/10 hidden md:block" />
              <Link
                href="/legal"
                className="text-xs text-[#5C5652] dark:text-[#A8A29E] hover:text-[#B34B44] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 tracking-widest font-medium uppercase inline-block"
              >
                {tf("links.legal")}
              </Link>
              <span className="w-px h-3 bg-[#2D2926]/10 dark:bg-white/10 hidden md:block" />
              <Link
                href="/privacy"
                className="text-xs text-[#5C5652] dark:text-[#A8A29E] hover:text-[#B34B44] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 tracking-widest font-medium uppercase inline-block"
              >
                {tf("links.privacy")}
              </Link>
            </div>
            <p className="text-[10px] text-[#5C5652] dark:text-[#A8A29E] font-[family-name:var(--font-geist-mono)] tracking-[0.2em] uppercase opacity-60">
              {tf("tva")}
            </p>
          </div>
          <div className="mt-8 pt-8 border-t border-[#2D2926]/5 dark:border-white/[0.05] flex justify-center">
            <p
              onClick={() => analytics.easterEggClicked()}
              className="text-[10px] text-stone-500 dark:text-stone-400 font-medium tracking-[0.15em] uppercase text-center opacity-70 hover:opacity-100 transition-opacity duration-500 cursor-default"
            >
              {tf("easter_egg")}
            </p>
          </div>
        </div>
      </footer>
    </footer>
  );
}
