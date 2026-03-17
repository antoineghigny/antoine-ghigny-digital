import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  CheckCircle,
  ShieldCheck,
  Clock,
  ArrowUpRight,
  Pulse,
  ChartLineUp,
  Lightning,
  Terminal,
} from "@phosphor-icons/react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] },
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

const BrowserMockup = () => {
  return (
    <div className="relative w-full aspect-[3/4] md:aspect-[4/5] bg-[#FAF8F5] rounded-3xl border border-stone-200 shadow-[0_30px_80px_-15px_rgba(179,75,68,0.12)] overflow-hidden flex flex-col">
      {/* Browser Header */}
      <div className="h-10 border-b border-stone-200 bg-white flex items-center px-5 justify-between shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
          <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
          <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
        </div>
        <div className="flex items-center gap-2 bg-stone-100/80 px-3 py-1 rounded-full border border-stone-200/50">
          <Pulse size={10} weight="bold" className="text-[#B34B44]" />
          <span className="text-[10px] text-stone-500 font-medium tracking-tight">performance.live</span>
        </div>
        <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center border border-stone-200">
          <Terminal size={12} weight="bold" className="text-stone-400" />
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 p-4 md:p-6 flex flex-col gap-4 md:gap-6 overflow-hidden">
        {/* Metric Cards */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {[
            { icon: Lightning, label: "Speed", val: "0.8s", color: "text-amber-600" },
            { icon: ChartLineUp, label: "SEO", val: "100", color: "text-[#B34B44]" },
            { icon: Pulse, label: "Uptime", val: "99.9%", color: "text-emerald-600" }
          ].map((m, i) => (
            <div key={i} className="bg-white p-3 md:p-4 rounded-xl border border-stone-200 shadow-sm flex flex-col gap-1.5">
              <m.icon size={16} weight="duotone" className={m.color} />
              <div>
                <p className="text-[8px] uppercase tracking-widest text-stone-400 font-bold">{m.label}</p>
                <p className="text-sm md:text-base font-bold text-[#2D2926] leading-none mt-0.5">{m.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Chart Section */}
        <div className="flex-1 bg-white rounded-2xl border border-stone-200 p-4 md:p-5 relative flex flex-col gap-4 overflow-hidden">
          <div className="flex justify-between items-center">
            <h4 className="text-[10px] font-bold text-[#2D2926] uppercase tracking-widest">Revenue Growth</h4>
            <div className="flex gap-1">
              {[1, 2, 3].map(j => <div key={j} className="w-4 h-1 rounded-full bg-stone-100" />)}
            </div>
          </div>
          
          <div className="flex-1 w-full relative group min-h-[120px]">
            <svg viewBox="0 0 400 150" className="w-full h-full" preserveAspectRatio="none">
              <motion.path
                d="M 0 130 Q 50 110 100 120 T 200 60 T 300 80 T 400 30"
                fill="none"
                stroke="#B34B44"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
              />
              <motion.path
                d="M 0 130 Q 50 110 100 120 T 200 60 T 300 80 T 400 30 L 400 150 L 0 150 Z"
                fill="url(#gradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 1 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#B34B44" stopOpacity="1" />
                  <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <motion.div 
              animate={{ x: ["0%", "100%", "0%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 bottom-0 w-px bg-stone-100"
            />
          </div>

          <div className="h-px bg-stone-100 w-full" />
          
          <div className="space-y-3">
            <div className="flex gap-4 items-center">
              <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="h-full bg-[#B34B44]/30" 
                />
              </div>
              <div className="w-8 h-2 bg-stone-100 rounded-full" />
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                  className="h-full bg-stone-200" 
                />
              </div>
              <div className="w-12 h-2 bg-stone-100 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default function HeroAndWhy() {
  const t = useTranslations("hero");
  return (
    <>
      {/* HERO */}
      <section className="min-h-[100dvh] flex items-center relative py-12 lg:py-0 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: -2 }}
              whileHover={{ scale: 1.02, rotate: 0 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.21, 0.45, 0.32, 0.9],
                scale: { type: "spring", stiffness: 100, damping: 20 }
              }}
              className="hidden md:block md:col-span-5 order-2 md:order-1"
            >
              <BrowserMockup />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="md:col-span-7 flex flex-col space-y-8 md:space-y-10 order-1 md:order-2"
            >
              <motion.div variants={fadeInUp} className="space-y-6">
                <div className="flex items-center space-x-2">
                  <span className="flex items-center bg-white/70 backdrop-blur-md border border-stone-200 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-medium tracking-widest uppercase text-[#B34B44]">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-2" />
                    {t("availability")}
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#2D2926] leading-[1.05] tracking-tighter">
                  {t("title_part1")}<br />
                  <span className="text-[#B34B44]">{t("title_part2")}</span>
                </h1>

                <p className="text-lg md:text-xl text-[#5C5652] leading-relaxed font-light max-w-[60ch]">
                  {t("description")}
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="#contact"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#B34B44] text-white px-10 py-5 rounded-full font-medium text-lg shadow-lg shadow-[#B34B44]/20 hover:bg-[#963f39] transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-3 overflow-hidden group"
                >
                  <span>{t("cta")}</span>
                  <ArrowUpRight weight="bold" size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.a>
              </motion.div>

              {/* Mobile Mockup Display */}
              <motion.div 
                variants={fadeInUp}
                className="md:hidden pt-4 pb-8"
              >
                <div className="scale-[1.02] origin-left">
                  <BrowserMockup />
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="mt-6 md:mt-12 pt-8 md:pt-12 border-t border-stone-200/60 flex flex-col gap-10"
              >
                {/* Trust Markers */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-6">
                  <div className="flex items-center gap-4 group shrink-0">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#B34B44]/5 flex items-center justify-center text-[#B34B44] transition-colors duration-300 group-hover:bg-[#B34B44]/10">
                      <CheckCircle weight="fill" size={24} />
                    </div>
                    <span className="text-[15px] font-medium text-[#2D2926] leading-tight">{t("trust.satisfied")}</span>
                  </div>
                  <div className="flex items-center gap-4 group shrink-0">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#B34B44]/5 flex items-center justify-center text-[#B34B44] transition-colors duration-300 group-hover:bg-[#B34B44]/10">
                      <ShieldCheck weight="fill" size={24} />
                    </div>
                    <span className="text-[15px] font-medium text-[#2D2926] leading-tight">{t("trust.fixed_price")}</span>
                  </div>
                  <div className="flex items-center gap-4 group shrink-0">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#B34B44]/5 flex items-center justify-center text-[#B34B44] transition-colors duration-300 group-hover:bg-[#B34B44]/10">
                      <Clock weight="fill" size={24} />
                    </div>
                    <span className="text-[15px] font-medium text-[#2D2926] leading-tight">{t("trust.response_time")}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

