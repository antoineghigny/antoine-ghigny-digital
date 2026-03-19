"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { MapPin } from "@phosphor-icons/react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { type: "spring", stiffness: 100, damping: 20 },
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 },
};

export default function ArtisanSection() {
  const t = useTranslations("artisan");

  return (
    <section className="bg-[#FAF8F5] dark:bg-[#1A1816] py-24 md:py-32 selection:bg-[#B34B44]/20 selection:text-[#B34B44] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Photo side */}
          <m.div
            className="md:col-span-5 relative"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(179,75,68,0.15)] group">
              <Image
                src="/images/antoine.webp"
                alt="Antoine Ghigny"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-[#B34B44]/10 mix-blend-multiply pointer-events-none" />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md py-3 px-5 rounded-full shadow-xl flex items-center gap-2 border border-[#2D2926]/5">
                <MapPin size={18} weight="fill" className="text-[#B34B44]" />
                <span className="text-sm font-medium text-[#2D2926] tracking-tight">
                  {t("location")}
                </span>
              </div>
            </div>
            <div className="absolute -z-10 -top-6 -right-6 w-32 h-32 border-r-2 border-t-2 border-[#B34B44]/20 rounded-tr-3xl hidden md:block" />
          </m.div>

          {/* Content side */}
          <m.div
            className="md:col-span-7 flex flex-col items-start"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <m.span variants={fadeInUp} className="text-xs uppercase tracking-widest font-medium text-[#B34B44] mb-6">
              {t("badge")}
            </m.span>

            <m.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-[#2D2926] dark:text-[#FAF8F5] mb-8">
              {t("title")}
            </m.h2>

            <m.p variants={fadeInUp} className="text-lg md:text-xl text-[#5C5652] dark:text-[#A8A29E] leading-relaxed font-light max-w-[60ch] mb-10">
              {t("content")}
            </m.p>


          </m.div>

        </div>
      </div>
    </section>
  );
}
