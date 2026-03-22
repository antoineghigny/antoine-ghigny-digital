"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  m,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
} from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Star,
  ChartLineUp,
  UserPlus,
  FileText,
  Robot,
  CalendarCheck,
  Check,
  Pulse,
  Terminal,
  X,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import SnakeGameContent from "./SnakeGame";

type TaskKey = "review" | "seo" | "client" | "quote" | "aisearch" | "booking";
type StatusType = "stars" | "rank" | "check" | "dot";

interface TaskDef {
  key: TaskKey;
  icon: Icon;
  statusType: StatusType;
}

const ALL_TASKS: TaskDef[] = [
  { key: "review", icon: Star, statusType: "stars" },
  { key: "seo", icon: ChartLineUp, statusType: "rank" },
  { key: "client", icon: UserPlus, statusType: "check" },
  { key: "quote", icon: FileText, statusType: "dot" },
  { key: "aisearch", icon: Robot, statusType: "check" },
  { key: "booking", icon: CalendarCheck, statusType: "check" },
];

const INITIAL_KEYS: TaskKey[] = ["review", "seo", "client"];
const SWIPE_THRESHOLD = 80;
const MAX_VISIBLE = 3;

/* ── Swipeable Row ── */
function SwipeableRow({
  task,
  onDismiss,
  t,
  showHint,
}: {
  task: TaskDef;
  onDismiss: (key: TaskKey) => void;
  t: ReturnType<typeof useTranslations>;
  showHint?: boolean;
}) {
  const x = useMotionValue(0);
  const isDismissing = useRef(false);
  const hintRef = useRef<{ timeout: ReturnType<typeof setTimeout>; interval: ReturnType<typeof setInterval> } | null>(null);

  const cardOpacity = useTransform(x, [-SWIPE_THRESHOLD * 1.5, 0], [0.4, 1]);
  const bgOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0]);
  const checkScale = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0.3]);

  useEffect(() => {
    if (!showHint) return;
    const playHint = () => {
      if (isDismissing.current) return;
      animate(x, -40, { type: "spring", stiffness: 200, damping: 20 }).then(() => {
        if (!isDismissing.current) animate(x, 0, { type: "spring", stiffness: 300, damping: 25 });
      });
    };
    const timeout = setTimeout(playHint, 1800);
    const interval = setInterval(playHint, 10000);
    hintRef.current = { timeout, interval };
    return () => { clearTimeout(timeout); clearInterval(interval); };
  }, [showHint, x]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (isDismissing.current) return;
    if (info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -500) {
      isDismissing.current = true;
      if (hintRef.current) {
        clearTimeout(hintRef.current.timeout);
        clearInterval(hintRef.current.interval);
      }
      animate(x, -500, { type: "spring", stiffness: 300, damping: 30 });
      setTimeout(() => onDismiss(task.key), 200);
    } else {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 25 });
    }
  };

  return (
    <m.div layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0, transition: { duration: 0.25 } }} className="relative overflow-hidden rounded-xl">
      <m.div style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-xl flex items-center justify-end pr-5 pointer-events-none">
        <m.div style={{ scale: checkScale }}>
          <Check size={20} weight="bold" className="text-emerald-600 dark:text-emerald-400" />
        </m.div>
      </m.div>
      <m.div style={{ x, opacity: cardOpacity }} drag="x" dragConstraints={{ right: 0 }}
        dragElastic={{ right: 0, left: 0.6 }} onDragEnd={handleDragEnd}
        className="bg-white dark:bg-[#242220] rounded-xl border border-stone-200/60 dark:border-white/[0.07] p-3.5 flex items-center justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)] touch-pan-y cursor-grab active:cursor-grabbing relative z-10">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] dark:bg-[#1A1816] flex items-center justify-center border border-stone-100 dark:border-white/[0.05] shrink-0">
            <task.icon size={20} weight="duotone" className="text-[#B34B44]" />
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-semibold text-[#2D2926] dark:text-[#FAF8F5] truncate">{t(`tasks.${task.key}.title`)}</div>
            <div className="text-[11px] text-stone-400 dark:text-stone-500 truncate">{t(`tasks.${task.key}.time`)}</div>
          </div>
        </div>
        <div className="shrink-0 ml-3"><TaskStatus task={task} /></div>
      </m.div>
    </m.div>
  );
}


/* ── Main Mockup ── */
export default function WhyMeMockup() {
  const t = useTranslations("whyMe.mockup");
  const [visibleKeys, setVisibleKeys] = useState<TaskKey[]>(INITIAL_KEYS);
  const [expanded, setExpanded] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    const timers = timersRef.current;
    return () => { timers.forEach(clearTimeout); };
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContentHeight(entry.contentRect.height);
    });
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, []);

  const dismiss = useCallback((key: TaskKey) => {
    setVisibleKeys((prev) => prev.filter((k) => k !== key));
    const timer = setTimeout(() => {
      setVisibleKeys((prev) => {
        if (prev.length >= MAX_VISIBLE) return prev;
        const pool = ALL_TASKS.filter((td) => !prev.includes(td.key));
        if (pool.length === 0) return prev;
        const next = pool[Math.floor(Math.random() * pool.length)];
        return [...prev, next.key];
      });
    }, 2500 + Math.random() * 2000);
    timersRef.current.push(timer);
  }, []);

  const visibleTasks = visibleKeys.map((key) => ALL_TASKS.find((td) => td.key === key)!).filter(Boolean);

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
      <m.div
        initial={false}
        animate={{ height: contentHeight || "auto" }}
        transition={{ type: "spring", stiffness: 200, damping: 28 }}
        className="relative w-full bg-[#FAF8F5] dark:bg-[#1A1816] rounded-3xl border border-stone-200 dark:border-white/10 shadow-[0_30px_80px_-15px_rgba(179,75,68,0.12)] dark:shadow-[0_30px_80px_-15px_rgba(179,75,68,0.25)] overflow-hidden"
      >
        <div ref={contentRef}>
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

          {/* Content: Tasks or Snake */}
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
                key="tasks"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-3 md:p-4"
              >
                {/* Position Google strip */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500 font-bold">{t("google.label")}</span>
                  <span className="text-[11px] font-mono font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/30 px-2 py-0.5 rounded-full">
                    {t("google.rank")}
                  </span>
                </div>

                {/* Swipeable tasks */}
                <div className="space-y-2">
                  <AnimatePresence mode="popLayout">
                    {visibleTasks.map((task, i) => (
                      <SwipeableRow key={task.key} task={task} onDismiss={dismiss} t={t} showHint={i === 0} />
                    ))}
                  </AnimatePresence>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </m.div>

      {!expanded && (
        <div className="hidden md:block absolute -z-10 -top-20 -right-20 w-64 h-64 bg-[#B34B44]/5 blur-[100px] rounded-full pointer-events-none" />
      )}
    </div>
  );
}

/* ── Status indicator ── */
function TaskStatus({ task }: { task: TaskDef }) {
  if (task.statusType === "stars") {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={11} weight="fill" className="text-[#B34B44]" />
        ))}
      </div>
    );
  }
  if (task.statusType === "rank") {
    return (
      <span className="text-[10px] font-mono font-bold bg-[#FAF8F5] dark:bg-[#1A1816] px-2 py-1 rounded-md border border-stone-200 dark:border-white/10 text-emerald-600 dark:text-emerald-400">
        #1
      </span>
    );
  }
  if (task.statusType === "dot") {
    return <div className="w-2.5 h-2.5 rounded-full bg-[#B34B44] animate-pulse" />;
  }
  return <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />;
}
