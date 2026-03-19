"use client";

import React, { useState, useEffect } from "react";
import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { UserCircle, Briefcase, MapPin } from "@phosphor-icons/react";
import Image from "next/image";

const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };

const textFadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
};

export default function ArtisanSection() {
  const t = useTranslations("artisan");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="bg-[#FAF8F5] dark:bg-[#1A1816] py-24 md:py-40 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 relative z-10">
        <m.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1, ...SPRING }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
        >
          {/* Main Content Column */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {/* 1. Introduction Header */}
            <div className="space-y-6 order-1">
              <m.div
                variants={textFadeUp}
                className="inline-flex items-center bg-[#B34B44]/5 dark:bg-[#B34B44]/10 border border-[#B34B44]/20 px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-[#B34B44]"
              >
                <UserCircle weight="fill" size={16} className="mr-2" />
                {t("badge")}
              </m.div>
              <m.h2
                variants={textFadeUp}
                className="text-5xl md:text-7xl font-bold tracking-tight text-[#2D2926] dark:text-[#FAF8F5] leading-[0.95] lg:leading-[1.1]"
              >
                {t("title")}
              </m.h2>
              <m.p
                variants={textFadeUp}
                className="text-xl md:text-2xl text-[#5C5652] dark:text-[#A8A29E] leading-relaxed font-light max-w-[45ch]"
              >
                {t("content")}
              </m.p>
            </div>

            {/* 2. Visual Side (Mobile only position) */}
            <m.div 
              initial={{ opacity: 0, y: 30, rotate: isMobile ? 0 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: isMobile ? 0 : 2 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 1.2,
                ease: [0.21, 0.45, 0.32, 0.9],
                rotate: { type: "spring", stiffness: 60, damping: 25 },
                scale: { type: "spring", stiffness: 60, damping: 25 }
              }}
              className="lg:hidden order-2 relative group"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-stone-200 dark:border-white/10 relative shadow-2xl shadow-[#B34B44]/10">
                 <Image 
                    src="/images/antoine.jpg"
                    alt="Antoine Ghigny"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#2D2926]/20 to-transparent mix-blend-multiply" />
              </div>
            </m.div>

            {/* 3. Details Section (Status, Location, Experience) */}
            <div className="space-y-10 order-3">
              <m.div variants={textFadeUp} className="flex flex-col sm:flex-row gap-8">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#242220] flex items-center justify-center text-[#B34B44] border border-stone-200 dark:border-white/10 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Briefcase size={24} weight="duotone" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500 font-bold leading-none">Status</p>
                    <p className="text-sm font-bold text-[#2D2926] dark:text-[#FAF8F5]">{t("experience")}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#242220] flex items-center justify-center text-[#B34B44] border border-stone-200 dark:border-white/10 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <MapPin size={24} weight="duotone" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500 font-bold leading-none">Location</p>
                    <p className="text-sm font-bold text-[#2D2926] dark:text-[#FAF8F5]">{t("location")}</p>
                  </div>
                </div>
              </m.div>

              <m.div variants={textFadeUp} className="space-y-6">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 dark:text-stone-500">
                  {t("experience_at")}
                </p>
                <div className="flex flex-nowrap items-center gap-3 md:gap-4 overflow-x-auto pb-2 sm:pb-0 sm:overflow-visible no-scrollbar">
                   {/* EC Card */}
                   <div className="bg-white/50 dark:bg-white/[0.03] border border-stone-200/50 dark:border-white/[0.05] rounded-xl md:rounded-2xl h-12 md:h-16 min-w-[100px] md:min-w-[140px] px-4 md:px-6 flex items-center justify-center shrink-0 hover:bg-white dark:hover:bg-white/[0.06] hover:border-[#B34B44]/20 transition-all duration-300 group shadow-sm text-[#2D2926] dark:text-[#FAF8F5]">
                      <Image src="/images/logos/ec.svg" alt="Commission Européenne" width={100} height={36} className="h-6 md:h-9 w-auto object-contain" />
                   </div>
                   {/* Proximus Card */}
                   <div className="bg-white/50 dark:bg-white/[0.03] border border-stone-200/50 dark:border-white/[0.05] rounded-xl md:rounded-2xl h-12 md:h-16 min-w-[100px] md:min-w-[140px] px-4 md:px-6 flex items-center justify-center shrink-0 hover:bg-white dark:hover:bg-white/[0.06] hover:border-[#5C2D91]/20 transition-all duration-300 group shadow-sm">
                      <Image src="/images/logos/proximus.svg" alt="Proximus" width={140} height={56} className="h-8 md:h-14 w-auto object-contain" />
                   </div>
                   {/* Accenture Card */}
                   <div className="bg-white/50 dark:bg-white/[0.03] border border-stone-200/50 dark:border-white/[0.05] rounded-xl md:rounded-2xl h-12 md:h-16 min-w-[100px] md:min-w-[140px] px-4 md:px-6 flex items-center justify-center shrink-0 hover:bg-white dark:hover:bg-white/[0.06] hover:border-[#A100FF]/20 transition-all duration-300 group shadow-sm">
                      <Image src="/images/logos/accenture.svg" alt="Accenture" width={110} height={24} className="h-4 md:h-6 w-auto object-contain" />
                   </div>
                </div>
              </m.div>
            </div>
          </div>

          {/* Visual Side (Desktop only position) */}
          <m.div 
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 2 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 1.2,
              ease: [0.21, 0.45, 0.32, 0.9],
              rotate: { type: "spring", stiffness: 60, damping: 25 },
              scale: { type: "spring", stiffness: 60, damping: 25 }
            }}
            className="hidden lg:block lg:col-span-5 relative group"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-stone-200 dark:border-white/10 relative shadow-2xl shadow-[#B34B44]/10 transition-shadow duration-500 group-hover:shadow-[#B34B44]/20">
               <Image 
                  src="/images/antoine.jpg"
                  alt="Antoine Ghigny"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="40vw"
                  priority
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#2D2926]/20 to-transparent mix-blend-multiply" />
            </div>
            
            <div className="absolute -z-10 -right-12 -bottom-12 w-64 h-64 bg-[#B34B44]/10 dark:bg-[#B34B44]/20 blur-[80px] rounded-full" />
            <div className="absolute -z-10 -left-12 -top-12 w-48 h-48 bg-stone-200 dark:bg-stone-800/50 blur-[60px] rounded-full" />
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
