"use client";

import React, { useRef, useState } from "react";
import {
  m,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useInView,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { ChatCircle, FileText, RocketLaunch } from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

const EASE: [number, number, number, number] = [0.21, 0.45, 0.32, 0.9];

type StepDef = {
  num: string;
  label: string;
  desc: string;
  Icon: PhosphorIcon;
};

/* ── Each card has a distinct entrance ──────────────────────────────────── */
const ENTRANCES = [
  { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
  { hidden: { opacity: 0, scale: 0.92, y: 40 }, visible: { opacity: 1, scale: 1, y: 0 } },
  { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
];

/* ── Step Card ───────────────────────────────────────────────────────────── */
function StepCard({
  step,
  index,
  isActive,
}: {
  step: StepDef;
  index: number;
  isActive: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-80px 0px" });
  const entrance = ENTRANCES[index] ?? ENTRANCES[0];

  return (
    <m.div
      ref={cardRef}
      initial={entrance.hidden}
      animate={inView ? entrance.visible : entrance.hidden}
      transition={{ duration: 0.85, ease: EASE }}
      className={[
        "relative overflow-hidden rounded-[2.5rem] border p-10 md:p-14",
        "transition-[border-color,box-shadow] duration-500",
        isActive
          ? "border-[#B34B44]/20 bg-white dark:bg-[#242220] shadow-[0_12px_50px_-8px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_50px_-8px_rgba(0,0,0,0.3)]"
          : "border-stone-200/60 dark:border-white/[0.06] bg-white dark:bg-[#242220] shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.15)]",
      ].join(" ")}
    >
      {/* Huge decorative step number in background */}
      <div
        aria-hidden
        className="absolute -right-3 -top-2 font-black leading-none select-none pointer-events-none opacity-[0.025] dark:opacity-[0.035] tracking-tighter text-[#2D2926] dark:text-white"
        style={{ fontSize: "clamp(120px, 16vw, 200px)" }}
      >
        {step.num}
      </div>

      {/* Left accent bar — appears when active */}
      <m.div
        initial={false}
        animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="absolute left-0 top-[20%] h-[60%] w-[3px] rounded-r-full origin-center bg-[#B34B44]"
      />

      <div className="relative z-10 flex flex-col sm:flex-row gap-8 md:gap-12 items-start sm:items-center">

        {/* Icon — spins in with spring, fills when active */}
        <m.div
          initial={{ scale: 0.4, opacity: 0, rotate: -25 }}
          animate={inView ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0.4, opacity: 0, rotate: -25 }}
          transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.2 }}
          className={[
            "shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl",
            "flex items-center justify-center",
            "transition-[background-color,color] duration-500",
            isActive
              ? "bg-[#B34B44] text-white"
              : "bg-[#B34B44]/[0.07] dark:bg-[#B34B44]/[0.12] text-[#B34B44]",
          ].join(" ")}
        >
          <step.Icon size={32} weight="duotone" />
        </m.div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#B34B44] block mb-2">
            {step.num}
          </span>

          {/* Title — masked slide-up reveal */}
          <div className="overflow-hidden mb-3">
            <m.h3
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : { y: "110%" }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.18 }}
              className="text-2xl md:text-4xl font-bold text-[#2D2926] dark:text-[#FAF8F5] tracking-tighter leading-tight"
            >
              {step.label}
            </m.h3>
          </div>

          {/* Description — fade in with slight upward motion */}
          <m.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="text-base md:text-lg font-light text-[#5C5652] dark:text-[#A8A29E] leading-relaxed max-w-lg"
          >
            {step.desc}
          </m.p>
        </div>
      </div>
    </m.div>
  );
}

/* ── Main section ────────────────────────────────────────────────────────── */
export default function ProcessSection() {
  const t = useTranslations("process");
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(-1);

  /* ── Scroll-driven progress line ─────────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 72%", "end 28%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 28,
    restDelta: 0.001,
  });

  // Update which step is highlighted as user scrolls
  useMotionValueEvent(smoothProgress, "change", (v) => {
    if (v > 0.72) setActiveStep(2);
    else if (v > 0.36) setActiveStep(1);
    else if (v > 0.06) setActiveStep(0);
    else setActiveStep(-1);
  });

  // Line grows from top as you scroll down
  const lineScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

  // Clean indicator dot travels the line
  const orbTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const steps: StepDef[] = [
    { num: t("step1_number"), label: t("step1_label"), desc: t("step1_desc"), Icon: ChatCircle },
    { num: t("step2_number"), label: t("step2_label"), desc: t("step2_desc"), Icon: FileText },
    { num: t("step3_number"), label: t("step3_label"), desc: t("step3_desc"), Icon: RocketLaunch },
  ];

  return (
    <section
      ref={sectionRef}
      id="process"
      className="bg-[#FAF8F5] dark:bg-[#1A1816] py-16 md:py-28 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-24 items-end">
          <div className="md:col-span-7">
            <m.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xs uppercase tracking-widest font-medium text-[#B34B44] block mb-6"
            >
              {t("badge")}
            </m.span>

            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-[#2D2926] dark:text-[#FAF8F5]">
              <span className="block overflow-hidden pb-1">
                <m.span
                  initial={{ y: "110%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: EASE }}
                  className="block"
                >
                  {t("title_part1")}
                </m.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <m.span
                  initial={{ y: "110%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                  className="block text-[#B34B44]"
                >
                  {t("title_part2")}
                </m.span>
              </span>
            </h2>
          </div>

          <m.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="md:col-span-5 flex flex-col gap-3 pb-1"
          >
            {[t("marker1"), t("marker2"), t("marker3")].map((marker, i) => (
              <m.div
                key={marker}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 + i * 0.1, ease: EASE }}
                className="flex items-center gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#B34B44] shrink-0" />
                <span className="text-sm font-medium text-[#5C5652] dark:text-[#A8A29E]">
                  {marker}
                </span>
              </m.div>
            ))}
          </m.div>
        </div>

        {/* ── Timeline + Cards ────────────────────────────────────────────── */}
        <div className="relative">

          {/* Scroll-driven vertical progress line — desktop only */}
          <div
            aria-hidden
            className="hidden md:block absolute left-0 top-2 bottom-2 w-[2px] pointer-events-none"
          >
            {/* Track */}
            <div className="absolute inset-0 rounded-full bg-stone-200 dark:bg-white/[0.07]" />

            {/* Progress fill */}
            <m.div
              style={{ scaleY: lineScaleY }}
              className="absolute inset-0 rounded-full bg-[#B34B44] origin-top"
            />

            {/* Traveling indicator dot — clean, no effects */}
            <m.div
              style={{ top: orbTop }}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-[#B34B44] ring-[3px] ring-[#FAF8F5] dark:ring-[#1A1816]"
            />
          </div>

          {/* Step cards */}
          <div className="md:pl-12 space-y-6 md:space-y-8">
            {steps.map((step, i) => (
              <StepCard
                key={i}
                step={step}
                index={i}
                isActive={activeStep === i}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
