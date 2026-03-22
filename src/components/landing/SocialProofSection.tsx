"use client";

import React from "react";
import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star, ArrowUpRight, Quotes } from "@phosphor-icons/react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
};

const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };

export default function SocialProofSection() {
  const t = useTranslations("success");

  return (
    <section className="bg-[#2D2926] py-24 md:py-40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
        <m.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.12, ...SPRING }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Left: headline + CTA */}
          <div className="flex flex-col gap-8">
            <m.span
              variants={fadeUp}
              className="text-sm uppercase tracking-[0.2em] font-bold text-[#B34B44]"
            >
              {t("badge")}
            </m.span>

            <m.h2
              variants={fadeUp}
              className="text-5xl md:text-7xl font-bold tracking-tight text-[#FAF8F5] leading-[1.0]"
            >
              {t("title")}
            </m.h2>

            <m.p
              variants={fadeUp}
              className="text-xl md:text-2xl text-[#FAF8F5]/60 leading-relaxed font-light max-w-[38ch]"
            >
              {t("subtitle")}
            </m.p>

            <m.div variants={fadeUp}>
              <m.a
                href="#contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 bg-[#B34B44] text-white px-8 py-4 rounded-full font-medium text-lg shadow-lg shadow-[#B34B44]/30 hover:bg-[#963f39] transition-all duration-300 group"
              >
                <span>{t("cta")}</span>
                <ArrowUpRight weight="bold" size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </m.a>
            </m.div>
          </div>

          {/* Right: testimonial + Google badge */}
          <div className="flex flex-col gap-6">
            {/* Testimonial card */}
            <m.div
              variants={fadeUp}
              className="bg-[#FAF8F5] rounded-[2.5rem] p-8 md:p-10 flex flex-col gap-6"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} weight="fill" className="text-[#B34B44]" />
                ))}
              </div>

              {/* Quote icon + text */}
              <div className="relative">
                <Quotes size={32} weight="fill" className="text-[#B34B44]/10 absolute -top-1 -left-1" />
                <blockquote className="text-xl md:text-2xl font-medium text-[#2D2926] leading-snug tracking-tight pl-2">
                  {t("testimonial")}
                </blockquote>
              </div>

              {/* Attribution */}
              <div className="flex items-center gap-3 pt-2 border-t border-stone-200">
                <div className="w-10 h-10 rounded-full bg-[#B34B44]/10 flex items-center justify-center shrink-0">
                  <span className="text-[#B34B44] font-bold text-sm">C</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#2D2926]">{t("attribution")}</p>
                  <p className="text-xs text-[#5C5652]">{t("attribution_sub")}</p>
                </div>
              </div>
            </m.div>

            {/* Google Position badge */}
            <m.div
              variants={fadeUp}
              className="bg-white/[0.06] border border-white/[0.08] rounded-2xl p-5 flex items-center gap-5"
            >
              {/* Google "G" */}
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-md">
                <span className="font-bold text-xl" style={{ color: "#4285F4" }}>G</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#FAF8F5] tracking-tight">{t("google_badge")}</p>
                <p className="text-sm text-[#FAF8F5]/50 uppercase tracking-widest font-medium">{t("google_label")}</p>
              </div>
              <div className="ml-auto">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </m.div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
