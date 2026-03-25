"use client";

import React, { useRef, useState } from "react";
import { m, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
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

  // Box 1: 3D tilt
  const box1Ref = useRef<HTMLDivElement>(null);
  const box1X = useMotionValue(0.5);
  const box1Y = useMotionValue(0.5);
  const box1RotateY = useTransform(box1X, [0, 1], [-4, 4]);
  const box1RotateX = useTransform(box1Y, [0, 1], [3, -3]);

  const handleBox1Move = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!box1Ref.current) return;
    const r = box1Ref.current.getBoundingClientRect();
    box1X.set((e.clientX - r.left) / r.width);
    box1Y.set((e.clientY - r.top) / r.height);
  };
  const handleBox1Leave = () => {
    animate(box1X, 0.5, { type: "spring", stiffness: 200, damping: 25 });
    animate(box1Y, 0.5, { type: "spring", stiffness: 200, damping: 25 });
  };

  // Box 2: shimmer hover
  const [box2Hovered, setBox2Hovered] = useState(false);

  return (
    <section className="bg-[#FAF8F5] dark:bg-[#1A1816] py-12 md:py-20 overflow-hidden">
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

              {/* Line-by-line masked reveal */}
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[#2D2926] dark:text-[#FAF8F5] leading-[0.9] lg:leading-[1.1]">
                <span className="block overflow-hidden pb-1">
                  <m.span
                    initial={{ y: "110%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, ease: [0.21, 0.45, 0.32, 0.9] }}
                    className="block"
                  >
                    {t("title_part1")}
                  </m.span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <m.span
                    initial={{ y: "110%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, delay: 0.12, ease: [0.21, 0.45, 0.32, 0.9] }}
                    className="block"
                  >
                    <span className="text-[#B34B44]">{t("title_part2")}</span>
                    {t("title_part3")}
                  </m.span>
                </span>
              </h2>
            </div>

            <m.div
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                scale: { type: "spring", stiffness: 60, damping: 25 },
              }}
              className="md:col-span-6"
            >
              <WhyMeMockup />
            </m.div>
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">

            {/* Box 1: Professionalism — 3D tilt */}
            <div className="md:col-span-7" style={{ perspective: 1200 }}>
              <m.div
                ref={box1Ref}
                variants={fadeUp}
                style={{ rotateX: box1RotateX, rotateY: box1RotateY }}
                onMouseMove={handleBox1Move}
                onMouseLeave={handleBox1Leave}
                transition={SPRING}
                className="group relative bg-white dark:bg-[#242220] rounded-[3rem] border border-stone-200/60 dark:border-white/[0.07] p-10 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden h-full"
              >
                <div className="flex flex-col h-full justify-between relative z-10">
                  <div>
                    <span className="text-sm uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-bold block mb-8">
                      {t("bento.professionalism.label")}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#2D2926] dark:text-[#FAF8F5] tracking-tighter leading-tight max-w-xl">
                      {t.rich("bento.professionalism.title", {
                        highlight: (chunks) => <span className="text-[#B34B44]">{chunks}</span>,
                      })}
                    </h3>
                  </div>
                </div>
                <div className="absolute -right-10 -bottom-10 opacity-[0.03] dark:opacity-[0.06] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
                  <Target size={280} weight="thin" />
                </div>
              </m.div>
            </div>

            {/* Box 2: Trust — shimmer on hover */}
            <m.div
              variants={fadeUp}
              whileHover={{ y: -8 }}
              onHoverStart={() => setBox2Hovered(true)}
              onHoverEnd={() => setBox2Hovered(false)}
              transition={SPRING}
              className="md:col-span-5 group relative bg-white dark:bg-[#242220] rounded-[3rem] border border-stone-200/60 dark:border-white/[0.07] p-10 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden"
            >
              <AnimatePresence>
                {box2Hovered && (
                  <m.div
                    key="shimmer"
                    className="absolute inset-y-0 w-1/2 pointer-events-none z-20"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.11) 50%, transparent 100%)",
                    }}
                    initial={{ x: "-100%" }}
                    animate={{ x: "350%" }}
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>
              <div className="flex flex-col h-full justify-between relative z-10">
                <div>
                  <span className="text-sm uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-bold block mb-8">
                    {t("bento.trust.label")}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#2D2926] dark:text-[#FAF8F5] tracking-tighter leading-tight">
                    {t.rich("bento.trust.title", {
                      highlight: (chunks) => <span className="text-[#B34B44]">{chunks}</span>,
                    })}
                  </h3>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-[0.03] dark:opacity-[0.06] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
                <ShieldCheck size={280} weight="thin" />
              </div>
            </m.div>

            {/* Box 3: Performance — periodic glow pulse */}
            <m.div
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={SPRING}
              className="md:col-span-5 group relative bg-white dark:bg-[#242220] rounded-[3rem] border border-stone-200/60 dark:border-white/[0.07] p-10 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden"
            >
              <div className="flex flex-col h-full justify-between relative z-10">
                <div>
                  <span className="text-sm uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-bold block mb-8">
                    {t("bento.performance.label")}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#2D2926] dark:text-[#FAF8F5] tracking-tighter leading-tight">
                    {t.rich("bento.performance.title", {
                      highlight: (chunks) => <span className="text-[#B34B44]">{chunks}</span>,
                    })}
                  </h3>
                </div>
              </div>
              {/* Periodic glow blob */}
              <m.div
                animate={{ opacity: [0, 0.2, 0], scale: [0.7, 1.3, 0.7] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2.8, ease: "easeInOut" }}
                className="absolute -right-16 -bottom-16 w-60 h-60 rounded-full bg-amber-400/70 blur-[50px] pointer-events-none"
              />
              <div className="absolute -right-10 -bottom-10 opacity-[0.04] dark:opacity-[0.07] pointer-events-none text-amber-500">
                <Lightning size={280} weight="thin" />
              </div>
            </m.div>

            {/* Box 4: Design — slow animated gradient blobs */}
            <m.div
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={SPRING}
              className="md:col-span-7 group relative bg-white dark:bg-[#242220] rounded-[3rem] border border-stone-200/60 dark:border-white/[0.07] p-10 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden"
            >
              <div className="flex flex-col h-full justify-between relative z-10">
                <div>
                  <span className="text-sm uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-bold block mb-8">
                    {t("bento.design.label")}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#2D2926] dark:text-[#FAF8F5] tracking-tighter leading-tight max-w-xl">
                    {t.rich("bento.design.title", {
                      highlight: (chunks) => <span className="text-[#B34B44]">{chunks}</span>,
                    })}
                  </h3>
                </div>
              </div>
              {/* Slow morphing gradient blobs */}
              <m.div
                animate={{
                  scale: [1, 1.4, 1],
                  x: [0, 30, 0],
                  y: [0, -25, 0],
                  opacity: [0.06, 0.15, 0.06],
                }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-24 -bottom-24 w-80 h-80 rounded-full bg-[#B34B44] blur-[70px] pointer-events-none"
              />
              <m.div
                animate={{
                  scale: [1.3, 1, 1.3],
                  x: [0, -20, 0],
                  y: [0, 20, 0],
                  opacity: [0.04, 0.1, 0.04],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                className="absolute right-10 -top-10 w-52 h-52 rounded-full bg-orange-300 blur-[60px] pointer-events-none"
              />
              <div className="absolute -right-10 -bottom-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                <UserFocus size={280} weight="thin" />
              </div>
            </m.div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
