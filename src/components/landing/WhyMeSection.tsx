"use client";

import React from "react";
import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { ShieldCheck, Target, Lightning, UserFocus } from "@phosphor-icons/react";
import WhyMeMockup from "./WhyMeMockup";

const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
};

export default function WhyMeSection() {
  const t = useTranslations("whyMe");
  
  return (
    <section className="bg-[#FAF8F5] dark:bg-[#1A1816] pt-12 md:pt-20 pb-24 md:pb-40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
        <m.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1, ...SPRING }}
          className="space-y-16 md:space-y-32"
        >
          {/* Header + Mockup */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-6">
              <m.p
                variants={fadeUp}
                className="text-sm uppercase tracking-[0.2em] font-bold text-[#B34B44] mb-6"
              >
                {t("badge")}
              </m.p>
              <m.h2
                variants={fadeUp}
                className="text-5xl md:text-7xl font-bold tracking-tight text-[#2D2926] dark:text-[#FAF8F5] leading-[0.9] lg:leading-[1.1]"
              >
                {t("title_part1")}<br />
                <span className="text-[#B34B44]">{t("title_part2")}</span>{t("title_part3")}
              </m.h2>
            </div>
            <m.div 
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                scale: { type: "spring", stiffness: 60, damping: 25 }
              }}
              className="md:col-span-6"
            >
              <WhyMeMockup />
            </m.div>
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
            {/* Box 1: Professionalism - 7/12 */}
            <m.div 
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="md:col-span-7 group relative bg-white dark:bg-[#242220] rounded-[3rem] border border-stone-200/60 dark:border-white/[0.07] p-10 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden"
            >
              <div className="flex flex-col h-full justify-between relative z-10">
                <div>
                  <span className="text-sm uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-bold block mb-8">{t("bento.professionalism.label")}</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#2D2926] dark:text-[#FAF8F5] tracking-tighter leading-tight max-w-xl">
                    {t.rich("bento.professionalism.title", {
                      highlight: (chunks) => <span className="text-[#B34B44]">{chunks}</span>
                    })}
                  </h3>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-[0.03] dark:opacity-[0.06] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
                <Target size={280} weight="thin" />
              </div>
            </m.div>

            {/* Box 2: Trust - 5/12 */}
            <m.div 
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="md:col-span-5 group relative bg-white dark:bg-[#242220] rounded-[3rem] border border-stone-200/60 dark:border-white/[0.07] p-10 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden"
            >
              <div className="flex flex-col h-full justify-between relative z-10">
                <div>
                  <span className="text-sm uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-bold block mb-8">{t("bento.trust.label")}</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#2D2926] dark:text-[#FAF8F5] tracking-tighter leading-tight">
                    {t.rich("bento.trust.title", {
                      highlight: (chunks) => <span className="text-[#B34B44]">{chunks}</span>
                    })}
                  </h3>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-[0.03] dark:opacity-[0.06] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
                <ShieldCheck size={280} weight="thin" />
              </div>
            </m.div>

            {/* Box 3: Performance - 5/12 */}
            <m.div 
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="md:col-span-5 group relative bg-white dark:bg-[#242220] rounded-[3rem] border border-stone-200/60 dark:border-white/[0.07] p-10 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden"
            >
              <div className="flex flex-col h-full justify-between relative z-10">
                <div>
                  <span className="text-sm uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-bold block mb-8">{t("bento.performance.label")}</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#2D2926] dark:text-[#FAF8F5] tracking-tighter leading-tight">
                    {t.rich("bento.performance.title", {
                      highlight: (chunks) => <span className="text-[#B34B44]">{chunks}</span>
                    })}
                  </h3>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-[0.03] dark:opacity-[0.06] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
                <Lightning size={280} weight="thin" />
              </div>
            </m.div>

            {/* Box 4: Design - 7/12 */}
            <m.div 
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="md:col-span-7 group relative bg-white dark:bg-[#242220] rounded-[3rem] border border-stone-200/60 dark:border-white/[0.07] p-10 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden"
            >
              <div className="flex flex-col h-full justify-between relative z-10">
                <div>
                  <span className="text-sm uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-bold block mb-8">{t("bento.design.label")}</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#2D2926] dark:text-[#FAF8F5] tracking-tighter leading-tight max-w-xl">
                    {t.rich("bento.design.title", {
                      highlight: (chunks) => <span className="text-[#B34B44]">{chunks}</span>
                    })}
                  </h3>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-[0.03] dark:opacity-[0.06] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
                <UserFocus size={280} weight="thin" />
              </div>
            </m.div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
