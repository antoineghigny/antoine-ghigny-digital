"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ShieldCheck,
  Clock,
  ArrowRight,
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
        <div className="w-20 h-3 bg-stone-100 rounded" />
        <div className="flex gap-4">
          <div className="w-12 h-2 bg-stone-100 rounded" />
          <div className="w-12 h-2 bg-stone-100 rounded" />
        </div>
      </div>
      <div className="space-y-3 pt-4">
        <div className="w-3/4 h-8 bg-[#B34B44]/5 rounded" />
        <div className="w-1/2 h-8 bg-[#B34B44]/5 rounded" />
      </div>
      <div className="w-full h-32 bg-stone-50 rounded-lg flex items-center justify-center border border-dashed border-stone-200">
        <div className="w-24 h-8 bg-[#B34B44] opacity-20 rounded-full" />
      </div>
      <div className="grid grid-cols-3 gap-4 pt-2">
        <div className="h-16 bg-stone-50 rounded" />
        <div className="h-16 bg-stone-50 rounded" />
        <div className="h-16 bg-stone-50 rounded" />
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
              transition={{ duration: 1.2, ease: [0.21, 0.45, 0.32, 0.9] }}
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
                <a
                  href="#contact"
                  className="bg-[#B34B44] text-white px-10 py-5 rounded-full font-medium text-lg shadow-lg shadow-[#B34B44]/20 hover:bg-[#963f39] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  Demander un audit gratuit
                  <ArrowRight weight="bold" size={20} />
                </a>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="pt-10 border-t border-stone-200/60 grid grid-cols-1 sm:grid-cols-3 gap-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#B34B44]/5 flex items-center justify-center text-[#B34B44]">
                    <CheckCircle weight="fill" size={24} />
                  </div>
                  <span className="text-sm font-medium text-[#2D2926]">Satisfait ou retravaille</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#B34B44]/5 flex items-center justify-center text-[#B34B44]">
                    <ShieldCheck weight="fill" size={24} />
                  </div>
                  <span className="text-sm font-medium text-[#2D2926]">Prix fixe</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#B34B44]/5 flex items-center justify-center text-[#B34B44]">
                    <Clock weight="fill" size={24} />
                  </div>
                  <span className="text-sm font-medium text-[#2D2926]">Reponse sous 24h</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

    </>
  );
}
