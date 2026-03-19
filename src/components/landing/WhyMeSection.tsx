"use client";

import React from "react";
import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { ShieldCheck, Target, Lightning, UserFocus, ArrowsClockwise, HardHat, CheckCircle, X } from "@phosphor-icons/react";
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

          {/* Collaboration Vision Section */}
          <m.div 
            variants={fadeUp}
            className="pt-16 md:pt-32 border-t border-stone-200/60 dark:border-white/[0.07]"
          >
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Left Block: Client Expertise */}
              <m.div 
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="group bg-white dark:bg-[#242220] p-8 md:p-14 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-stone-100 dark:border-white/[0.05] flex flex-col justify-between min-h-[400px] relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1816] flex items-center justify-center mb-10 border border-stone-100 dark:border-white/[0.05] text-[#2D2926] dark:text-[#FAF8F5]">
                    <HardHat size={28} weight="duotone" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-[#2D2926] dark:text-[#FAF8F5] tracking-tighter leading-[0.95] mb-8">
                    {t("collaboration.client.title_part1")} <br />
                    <span className="text-[#B34B44]">{t("collaboration.client.title_part2")}</span>
                  </h3>
                  <p className="text-lg text-[#2D2926]/60 dark:text-[#A8A29E] leading-relaxed max-w-[320px] font-medium">
                    {t("collaboration.client.description")}
                  </p>
                </div>
                <div className="absolute -right-10 -bottom-10 opacity-[0.03] dark:opacity-[0.06] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
                  <HardHat size={280} weight="thin" />
                </div>
              </m.div>

              {/* Central Loop Connector */}
              <div className="flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-20 h-20 md:w-24 md:h-24 bg-[#FAF8F5] dark:bg-[#1A1816] border-[8px] md:border-[10px] border-[#FAF8F5] dark:border-[#1A1816] rounded-full items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
                <m.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="p-3 md:p-4 bg-white dark:bg-[#242220] rounded-full border border-stone-100 dark:border-white/[0.05] text-[#B34B44] flex items-center justify-center"
                >
                  <ArrowsClockwise weight="bold" className="w-7 h-7 md:w-8 md:h-8" />
                </m.div>
              </div>

              {/* Right Block: Digital Vision */}
              <m.div 
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="group bg-[#2D2926] p-8 md:p-14 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(45,41,38,0.3)] flex flex-col justify-between min-h-[400px] relative overflow-hidden text-[#FAF8F5]"
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-10 backdrop-blur-md text-[#B34B44]">
                    <Lightning size={28} weight="fill" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[0.95] mb-8">
                    {t("collaboration.my.title_part1")} <br />
                    <span className="text-[#B34B44]">{t("collaboration.my.title_part2")}</span>
                  </h3>
                  <p className="text-lg text-[#FAF8F5]/60 leading-relaxed max-w-[320px] font-medium">
                    {t("collaboration.my.description")}
                  </p>
                </div>
                <div className="absolute -right-10 -bottom-10 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-700 pointer-events-none">
                  <Lightning size={280} weight="thin" />
                </div>
              </m.div>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
