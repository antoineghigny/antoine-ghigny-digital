"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ShieldCheck,
  Clock,
  ArrowUpRight,
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

const BelgianFlag = () => (
  <svg width="16" height="12" viewBox="0 0 3 2" className="inline-block mr-2 shadow-sm rounded-[1px]">
    <rect width="1" height="2" x="0" fill="#2D2926" />
    <rect width="1" height="2" x="1" fill="#FAE042" />
    <rect width="1" height="2" x="2" fill="#ED2939" />
  </svg>
);

const BrowserMockup = () => (
  <div className="relative w-full aspect-[4/3] bg-white rounded-xl border border-stone-200 shadow-[0_30px_80px_-15px_rgba(179,75,68,0.15)] overflow-hidden">
    <div className="h-10 border-b border-stone-100 bg-stone-50 flex items-center px-4 gap-2">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
      </div>
      <div className="flex-1 max-w-[280px] h-6 bg-white border border-stone-200 rounded-md mx-auto flex items-center px-3">
        <span className="text-[10px] text-stone-400 font-mono tracking-tight">votresite.be</span>
      </div>
    </div>
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="w-20 h-3 bg-stone-100 rounded animate-pulse" />
        <div className="flex gap-4">
          <div className="w-12 h-2 bg-stone-100 rounded animate-pulse" />
          <div className="w-12 h-2 bg-stone-100 rounded animate-pulse" />
        </div>
      </div>
      <div className="space-y-3 pt-4">
        <div className="w-3/4 h-8 bg-gradient-to-r from-[#B34B44]/10 via-[#B34B44]/5 to-[#B34B44]/10 rounded animate-pulse" />
        <div className="w-1/2 h-8 bg-gradient-to-r from-[#B34B44]/10 via-[#B34B44]/5 to-[#B34B44]/10 rounded animate-pulse" />
      </div>
      <div className="w-full h-32 bg-stone-50 rounded-lg flex items-center justify-center border border-dashed border-stone-200 animate-pulse">
        <div className="w-24 h-8 bg-[#B34B44]/20 rounded-full" />
      </div>
      <div className="grid grid-cols-3 gap-4 pt-2">
        <div className="h-16 bg-stone-50 rounded animate-pulse" />
        <div className="h-16 bg-stone-50 rounded animate-pulse" />
        <div className="h-16 bg-stone-50 rounded animate-pulse" />
      </div>
    </div>
  </div>
);

export default function HeroAndWhy() {
  return (
    <>
      {/* HERO */}
      <section className="min-h-[100dvh] flex items-center relative py-12 lg:py-0">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50, rotate: 0 }}
              animate={{ opacity: 1, x: 0, rotate: 2 }}
              whileHover={{ scale: 1.02, rotate: 0 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.21, 0.45, 0.32, 0.9],
                scale: { type: "spring", stiffness: 100, damping: 20 },
                rotate: { type: "spring", stiffness: 100, damping: 20 }
              }}
              className="hidden md:block md:col-span-5"
            >
              <BrowserMockup />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="md:col-span-7 flex flex-col space-y-10"
            >
              <motion.div variants={fadeInUp} className="space-y-6">
                <div className="flex items-center space-x-2">
                  <span className="flex items-center bg-white/50 backdrop-blur-sm border border-stone-200 px-3 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase text-[#B34B44]">
                    <BelgianFlag />
                    Base a Nivelles, Belgique
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#2D2926] leading-[1.05] tracking-tighter">
                  Votre site web.<br />
                  <span className="text-[#B34B44]">Enfin bien fait.</span>
                </h1>

                <p className="text-lg md:text-xl text-[#5C5652] leading-relaxed font-light max-w-[60ch]">
                  Je concois des sites web sur mesure, modernes et performants pour les independants et PME qui veulent un digital qui rapporte.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="#contact"
                  initial="initial"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#B34B44] text-white px-10 py-5 rounded-full font-medium text-lg shadow-lg shadow-[#B34B44]/20 hover:bg-[#963f39] transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-3 overflow-hidden"
                >
                  <span>Demander un audit gratuit</span>
                  <div className="relative h-5 w-5 overflow-hidden pointer-events-none">
                    <motion.div
                      variants={{
                        initial: { x: 0, y: 0 },
                        hover: { x: 25, y: -25 }
                      }}
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                      className="relative w-full h-full"
                    >
                      <ArrowUpRight weight="bold" size={20} className="absolute inset-0" />
                      <ArrowUpRight weight="bold" size={20} className="absolute inset-0 -translate-x-[25px] translate-y-[25px]" />
                    </motion.div>
                  </div>
                </motion.a>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="mt-12 pt-12 border-t border-stone-200/60 flex flex-col sm:flex-row flex-wrap gap-x-12 gap-y-6"
              >
                <div className="flex items-center gap-4 group shrink-0">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#B34B44]/5 flex items-center justify-center text-[#B34B44] transition-colors duration-300 group-hover:bg-[#B34B44]/10">
                    <CheckCircle weight="fill" size={24} />
                  </div>
                  <span className="text-[15px] font-medium text-[#2D2926] leading-tight">Satisfait ou retravaille</span>
                </div>
                <div className="flex items-center gap-4 group shrink-0">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#B34B44]/5 flex items-center justify-center text-[#B34B44] transition-colors duration-300 group-hover:bg-[#B34B44]/10">
                    <ShieldCheck weight="fill" size={24} />
                  </div>
                  <span className="text-[15px] font-medium text-[#2D2926] leading-tight">Prix fixe</span>
                </div>
                <div className="flex items-center gap-4 group shrink-0">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#B34B44]/5 flex items-center justify-center text-[#B34B44] transition-colors duration-300 group-hover:bg-[#B34B44]/10">
                    <Clock weight="fill" size={24} />
                  </div>
                  <span className="text-[15px] font-medium text-[#2D2926] leading-tight">Reponse sous 24h</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

    </>
  );
}
