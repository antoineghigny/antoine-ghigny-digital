"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChatCircle, FileText, RocketLaunch } from "@phosphor-icons/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

export default function ProcessSection() {
  const t = useTranslations("process");

  const steps = [
    { num: t("step1_number"), label: t("step1_label"), desc: t("step1_desc") },
    { num: t("step2_number"), label: t("step2_label"), desc: t("step2_desc") },
    { num: t("step3_number"), label: t("step3_label"), desc: t("step3_desc") },
  ];

  return (
    <section id="process" className="bg-[#FAF8F5] dark:bg-[#1A1816] py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
          {/* Header */}
          <div className="md:col-span-5">
            <m.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.21, 0.45, 0.32, 0.9] }}
              className="text-xs uppercase tracking-widest font-medium text-[#B34B44] block mb-6"
            >
              {t("badge")}
            </m.span>
            <m.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }}
              className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-[#2D2926] dark:text-[#FAF8F5] mb-8"
            >
              {t("title_part1")}<br />
              <span className="text-[#B34B44]">{t("title_part2")}</span>
            </m.h2>

            {/* Reassurance markers move here for better layout */}
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }}
              className="hidden md:flex flex-col gap-4 pt-8 border-t border-[#2D2926]/5 dark:border-white/[0.07]"
            >
              {[t("marker1"), t("marker2"), t("marker3")].map((marker) => (
                <div key={marker} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#B34B44] shrink-0" />
                  <span className="text-sm font-medium text-[#5C5652] dark:text-[#A8A29E]">{marker}</span>
                </div>
              ))}
            </m.div>
          </div>

          {/* Steps - Vertical and Compact */}
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="md:col-span-7 space-y-10"
          >
            {steps.map((step, idx) => {
              const Icon = [ChatCircle, FileText, RocketLaunch][idx] || ChatCircle;
              return (
                <m.div
                  key={idx}
                  variants={itemVariants}
                  className="group flex gap-6 md:gap-8"
                >
                  {/* Left Column: Number and Icon */}
                  <div className="flex flex-col items-center gap-4 shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-[#B34B44]/5 dark:bg-[#B34B44]/10 flex items-center justify-center text-[#B34B44] transition-transform duration-500 group-hover:scale-110">
                      <Icon size={20} weight="duotone" />
                    </div>
                    {idx !== steps.length - 1 && (
                      <div className="w-px flex-1 bg-stone-200 dark:bg-white/10" />
                    )}
                  </div>

                  {/* Right Column: Content */}
                  <div className="pb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[#B34B44] text-[10px] uppercase tracking-widest font-bold">
                        {step.num}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-[#2D2926] dark:text-[#FAF8F5] tracking-tight">
                        {step.label}
                      </h3>
                    </div>
                    <p className="text-base font-light text-[#5C5652] dark:text-[#A8A29E] leading-relaxed max-w-lg">
                      {step.desc}
                    </p>
                  </div>
                </m.div>
              );
            })}
          </m.div>
        </div>

        {/* Reassurance markers for mobile only */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="md:hidden mt-12 pt-8 border-t border-[#2D2926]/5 dark:border-white/[0.07] flex flex-col gap-4"
        >
          {[t("marker1"), t("marker2"), t("marker3")].map((marker) => (
            <div key={marker} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#B34B44] shrink-0" />
              <span className="text-sm font-medium text-[#5C5652] dark:text-[#A8A29E]">{marker}</span>
            </div>
          ))}
        </m.div>

      </div>
    </section>
  );
}
