"use client";

import React from "react";
import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { WhatsappLogo, Envelope, ChatCircleText } from "@phosphor-icons/react";

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
            transition={{ staggerChildren: 0.1, ...SPRING }}
            className="flex flex-col md:flex-row gap-16 md:gap-24 items-start"
          >
            {/* Left side: Heading */}
            <div className="flex-1 space-y-8">
              <m.span
                variants={fadeUp}
                className="text-sm uppercase tracking-[0.2em] font-bold text-[#B34B44]"
              >
                {t("badge")}
              </m.span>
              <m.h2
                variants={fadeUp}
                className="text-5xl md:text-8xl font-bold tracking-tight text-[#2D2926] dark:text-[#FAF8F5] leading-[0.95] lg:leading-[1.1] max-w-[12ch]"
              >
                {t("title")}
              </m.h2>
            </div>

            {/* Right side: Action */}
            <div className="flex-1 space-y-12 pt-4 md:pt-16">
              <m.div variants={fadeUp} className="space-y-4">
                <div className="flex items-center gap-2.5 text-[#B34B44]">
                  <ChatCircleText size={20} weight="fill" />
                  <span className="text-xs uppercase tracking-widest font-medium">{t("inquiry_label")}</span>
                </div>
                <p className="text-xl md:text-2xl text-[#5C5652] dark:text-[#A8A29E] leading-relaxed font-light max-w-[40ch]">
                  {t("description")}
                </p>
              </m.div>
              
              <m.div variants={fadeUp} className="space-y-8">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <m.a
                    href={`https://wa.me/${t("phone_url")}`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-3 bg-[#B34B44] text-white px-8 py-5 rounded-full font-medium text-lg shadow-lg shadow-[#B34B44]/20 hover:bg-[#963f39] transition-all duration-300 group"
                  >
                    <WhatsappLogo weight="fill" size={24} />
                    <span>{t("cta_whatsapp")}</span>
                  </m.a>

                  <m.a
                    href={`mailto:${t("email")}?subject=${t("inquiry_label")}`}
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
      <footer className="relative z-50 bg-[#FAF8F5] dark:bg-[#1A1816] py-12 border-t border-[#2D2926]/5 dark:border-white/[0.05]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          {/* Secret message placement */}
          <div className="flex justify-center mb-8">
            <p className="text-[10px] italic text-stone-400 dark:text-stone-500/40 tracking-tight opacity-50 hover:opacity-100 transition-opacity cursor-default select-none">
              {tf("easter_egg")}
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-4">
            <div className="flex flex-col gap-2 items-center md:items-start">
              <p className="text-[10px] text-[#5C5652] dark:text-[#A8A29E] tracking-widest font-medium uppercase opacity-80">
                {tf("copyright", { year: currentYear })}
              </p>
              <p className="text-[10px] text-[#5C5652] dark:text-[#A8A29E] font-[family-name:var(--font-geist-mono)] tracking-[0.15em] uppercase opacity-60">
                {tf("tva")}
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
              <Link
                href="/about"
                className="text-[10px] text-[#5C5652] dark:text-[#A8A29E] hover:text-[#B34B44] transition-colors tracking-widest font-bold uppercase"
              >
                {tf("links.about")}
              </Link>
              <Link
                href="/faq"
                className="text-[10px] text-[#5C5652] dark:text-[#A8A29E] hover:text-[#B34B44] transition-colors tracking-widest font-bold uppercase"
              >
                {tf("links.faq")}
              </Link>
              <Link
                href="/legal"
                className="text-[10px] text-[#5C5652] dark:text-[#A8A29E] hover:text-[#B34B44] transition-colors tracking-widest font-bold uppercase"
              >
                {tf("links.legal")}
              </Link>
              <Link
                href="/privacy"
                className="text-[10px] text-[#5C5652] dark:text-[#A8A29E] hover:text-[#B34B44] transition-colors tracking-widest font-bold uppercase"
              >
                {tf("links.privacy")}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </footer>
  );
}
