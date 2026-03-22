"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  m,
  AnimatePresence,
} from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Star,
  ChartLineUp,
  Quotes,
  Pulse,
  Terminal,
  X,
} from "@phosphor-icons/react";
import SnakeGameContent from "./SnakeGame";

/* ── Main Mockup ── */
export default function WhyMeMockup() {
  const t = useTranslations("whyMe.mockup");
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = useCallback(() => setExpanded((v) => !v), []);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  return (
    <div className="relative">
      <div className="relative w-full bg-[#FAF8F5] dark:bg-[#1A1816] rounded-3xl border border-stone-200 dark:border-white/10 shadow-[0_30px_80px_-15px_rgba(179,75,68,0.12)] dark:shadow-[0_30px_80px_-15px_rgba(179,75,68,0.25)] overflow-hidden">
        {/* Browser Header */}
        <div className="h-10 border-b border-stone-200 dark:border-white/10 bg-white dark:bg-[#242220] flex items-center px-5 justify-between shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-stone-200 dark:bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-stone-200 dark:bg-white/10" />
            <button
              onClick={toggleExpand}
              className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
                expanded ? "bg-emerald-500 animate-pulse" : "bg-emerald-500/60 hover:bg-emerald-500"
              }`}
              aria-label={expanded ? "Shrink" : "Expand"}
            />
          </div>
          <div className="flex items-center gap-2 bg-stone-100/80 dark:bg-white/[0.06] px-3 py-1 rounded-full border border-stone-200/50 dark:border-white/[0.07]">
            {expanded ? (
              <Terminal size={10} weight="bold" className="text-stone-400" />
            ) : (
              <Pulse size={10} weight="bold" className="text-[#B34B44]" />
            )}
            <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium tracking-tight font-mono">
              {expanded ? "snake.exe" : t("url")}
            </span>
          </div>
          {expanded ? (
            <button
              onClick={() => setExpanded(false)}
              className="w-6 h-6 rounded-full bg-stone-100 dark:bg-white/[0.06] flex items-center justify-center border border-stone-200 dark:border-white/10 hover:bg-[#B34B44]/10 hover:border-[#B34B44]/20 transition-colors"
            >
              <X size={12} weight="bold" className="text-stone-400 dark:text-stone-500" />
            </button>
          ) : (
            <div className="w-6 h-6 rounded-full bg-stone-100 dark:bg-white/[0.06] flex items-center justify-center border border-stone-200 dark:border-white/10">
              <Terminal size={12} weight="bold" className="text-stone-400 dark:text-stone-500" />
            </div>
          )}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {expanded ? (
            <m.div
              key="snake"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full aspect-square flex flex-col">
                <SnakeGameContent active={true} onRequestClose={() => setExpanded(false)} />
              </div>
            </m.div>
          ) : (
            <m.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 md:p-6 flex flex-col gap-4"
            >
              {/* Google Position Badge */}
              <m.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="flex items-center gap-4 bg-white dark:bg-[#242220] rounded-2xl border border-stone-200/60 dark:border-white/[0.07] p-4 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#B34B44]/10 flex items-center justify-center shrink-0">
                  <ChartLineUp size={20} weight="duotone" className="text-[#B34B44]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500 font-bold">{t("google.label")}</p>
                  <p className="text-sm font-bold text-[#2D2926] dark:text-[#FAF8F5] truncate">{t("google.keyword")}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[9px] uppercase tracking-widest text-stone-400 dark:text-stone-500 font-bold">Position</p>
                  <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono leading-none">#1</p>
                </div>
              </m.div>

              {/* Stars Row */}
              <m.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center gap-3 bg-white dark:bg-[#242220] rounded-2xl border border-stone-200/60 dark:border-white/[0.07] p-4 shadow-sm"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} weight="fill" className="text-[#B34B44]" />
                  ))}
                </div>
                <p className="text-[12px] font-semibold text-[#2D2926] dark:text-[#FAF8F5]">{t("stars.label")}</p>
                <span className="ml-auto text-[11px] font-mono font-bold text-stone-400 dark:text-stone-500">4.9</span>
              </m.div>

              {/* Testimonial */}
              <m.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-[#2D2926] dark:bg-white/[0.04] rounded-2xl border border-transparent dark:border-white/[0.07] p-5 shadow-sm relative overflow-hidden"
              >
                <Quotes size={32} weight="fill" className="absolute top-3 right-4 text-white/10 dark:text-white/5" />
                <p className="text-[13px] md:text-sm text-white/80 dark:text-[#A8A29E] leading-relaxed italic relative z-10">
                  {t("testimonial.quote")}
                </p>
                <p className="text-[11px] font-bold text-[#B34B44] mt-3 uppercase tracking-widest">{t("testimonial.author")}</p>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {!expanded && (
        <div className="hidden md:block absolute -z-10 -top-20 -right-20 w-64 h-64 bg-[#B34B44]/5 blur-[100px] rounded-full pointer-events-none" />
      )}
    </div>
  );
}
