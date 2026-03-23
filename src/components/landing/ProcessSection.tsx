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
    <section id="process" className="bg-[#FAF8F5] dark:bg-[#1A1816] py-24 md:py-40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">

        {/* Header */}
        <div className="mb-20 md:mb-28 max-w-3xl">
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
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-[#2D2926] dark:text-[#FAF8F5]"
          >
            {t("title_part1")}<br />
            <span className="text-[#B34B44]">{t("title_part2")}</span>
          </m.h2>
        </div>

        {/* Steps */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10"
        >
          {steps.map((step, idx) => {
            const Icon = [ChatCircle, FileText, RocketLaunch][idx] || ChatCircle;
            return (
              <m.div
                key={idx}
                variants={itemVariants}
                className="group flex flex-col"
              >
                {/* Icon Badge */}
                <div className="w-12 h-12 rounded-2xl bg-[#B34B44]/5 dark:bg-[#B34B44]/10 flex items-center justify-center text-[#B34B44] mb-6 transition-transform duration-500 group-hover:scale-110">
                  <Icon size={24} weight="duotone" />
                </div>

                {/* Number + divider */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[#B34B44] text-xs uppercase tracking-widest font-bold shrink-0">
                    {step.num}
                  </span>
                  <div className="flex-1 h-px bg-[#2D2926]/5 dark:bg-white/[0.07]" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-[#2D2926] dark:text-[#FAF8F5] tracking-tight leading-tight">
                    {step.label}
                  </h3>
                  <p className="text-base font-light text-[#5C5652] dark:text-[#A8A29E] leading-relaxed max-w-[28ch]">
                    {step.desc}
                  </p>
                </div>
              </m.div>
            );
          })}
        </m.div>

        {/* Reassurance markers */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }}
          className="mt-20 md:mt-32 pt-10 border-t border-[#2D2926]/5 dark:border-white/[0.07] flex flex-wrap gap-x-10 gap-y-4"
        >
          {[t("marker1"), t("marker2"), t("marker3")].map((marker) => (
            <div key={marker} className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B34B44] shrink-0" />
              <span className="text-sm font-medium text-[#5C5652] dark:text-[#A8A29E]">{marker}</span>
            </div>
          ))}
        </m.div>

      </div>
    </section>
  );
}
