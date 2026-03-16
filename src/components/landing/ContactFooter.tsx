"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "@phosphor-icons/react";

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
    <footer className="bg-[#FAF8F5] selection:bg-[#B34B44] selection:text-white">
      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 md:py-40 bg-white rounded-t-[3rem] md:rounded-t-[5rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.03)]"
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 w-full">
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.1, ...SPRING }}
            className="flex flex-col md:flex-row gap-16 md:gap-24 items-start"
          >
            {/* Left side: Heading */}
            <div className="flex-1 space-y-8">
              <motion.span
                variants={fadeUp}
                className="text-xs uppercase tracking-widest font-medium text-[#B34B44]"
              >
                {t("badge")}
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="text-5xl md:text-8xl font-bold tracking-tight text-[#2D2926] leading-[0.95] lg:leading-[1.1] max-w-[12ch]"
              >
                {t("title")}
              </motion.h2>
            </div>

            {/* Right side: Action */}
            <div className="flex-1 space-y-10 pt-4 md:pt-16">
              <motion.p
                variants={fadeUp}
                className="text-xl md:text-2xl text-[#5C5652] leading-relaxed font-light max-w-[40ch]"
              >
                {t("description")}
              </motion.p>
              
              <motion.div variants={fadeUp} className="space-y-6">
                <motion.a
                  href="mailto:hello@antoineghigny.be?subject=Demande%20d%27audit%20gratuit"
                  initial="initial"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-3 bg-[#B34B44] text-white px-10 py-6 rounded-full font-medium text-xl shadow-2xl shadow-[#B34B44]/30 hover:bg-[#963f39] transition-all duration-300 group overflow-hidden"
                >
                  <span>{t("cta")}</span>
                  <div className="relative h-6 w-6 overflow-hidden pointer-events-none">
                    <motion.div
                      variants={{
                        initial: { x: 0, y: 0 },
                        hover: { x: 28, y: -28 }
                      }}
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                      className="relative w-full h-full"
                    >
                      <ArrowUpRight weight="bold" size={24} className="absolute inset-0" />
                      <ArrowUpRight weight="bold" size={24} className="absolute inset-0 -translate-x-[28px] translate-y-[28px]" />
                    </motion.div>
                  </div>
                </motion.a>
                
                <div className="flex items-center gap-3 px-6">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-sm text-[#5C5652] font-medium tracking-wide">
                    {t("status")}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Legal Footer */}
      <div className="bg-white py-12 border-t border-stone-100">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
            <p className="text-xs text-stone-500 tracking-wide font-medium">
              {tf("copyright", { year: currentYear })}
            </p>
            <div className="flex items-center gap-10">
              <a
                href="#"
                className="text-xs text-stone-500 hover:text-[#B34B44] transition-colors duration-300 tracking-wide font-medium uppercase"
              >
                {tf("links.legal")}
              </a>
              <span className="w-px h-3 bg-stone-200 hidden md:block" />
              <a
                href="#"
                className="text-xs text-stone-500 hover:text-[#B34B44] transition-colors duration-300 tracking-wide font-medium uppercase"
              >
                {tf("links.privacy")}
              </a>
            </div>
            <p className="text-xs text-stone-400 font-[family-name:var(--font-geist-mono)] tracking-wider">
              {tf("tva")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
