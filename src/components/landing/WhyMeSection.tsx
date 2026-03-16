"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Target, Lightning, UserFocus, Users, ArrowsClockwise, HardHat } from "@phosphor-icons/react";

const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
};

export default function WhyMeSection() {
  return (
    <section className="bg-[#FAF8F5] py-24 md:py-40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1, ...SPRING }}
          className="space-y-16 md:space-y-32"
        >
          {/* Header */}
          <div className="max-w-3xl">
            <motion.p 
              variants={fadeUp}
              className="text-xs uppercase tracking-widest font-medium text-[#B34B44] mb-6"
            >
              Pourquoi faire appel a moi
            </motion.p>
            <motion.h2 
              variants={fadeUp}
              className="text-5xl md:text-7xl font-bold tracking-tight text-[#2D2926] leading-[0.9] lg:leading-[1.1]"
            >
              Le digital devrait travailler<br />
              <span className="text-[#B34B44]">pour vous</span>, pas l&apos;inverse.
            </motion.h2>
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
            {/* Box 1: Professionalism - 7/12 */}
            <motion.div 
              variants={fadeUp}
              className="md:col-span-7 group relative bg-white rounded-[3rem] border border-stone-200/60 p-10 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(179,75,68,0.06)] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-stone-400 font-medium block mb-8">Premiere Impression</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#2D2926] tracking-tighter leading-tight max-w-xl">
                    Un site moderne et rapide qui <span className="text-[#B34B44]">convertit vos visiteurs</span> en clients fideles.
                  </h3>
                </div>
                <div className="mt-12 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] flex items-center justify-center text-[#B34B44] group-hover:scale-110 transition-transform duration-500">
                    <Target size={24} weight="duotone" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Box 2: Trust - 5/12 */}
            <motion.div 
              variants={fadeUp}
              className="md:col-span-5 group relative bg-white rounded-[3rem] border border-stone-200/60 p-10 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(179,75,68,0.06)] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-stone-400 font-medium block mb-8">Autorite Digitale</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#2D2926] tracking-tighter leading-tight">
                    Une image a la hauteur de votre <span className="text-[#B34B44]">expertise</span> reelle.
                  </h3>
                </div>
                <div className="mt-12">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] flex items-center justify-center text-[#B34B44] group-hover:rotate-12 transition-transform duration-500">
                    <ShieldCheck size={24} weight="duotone" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Box 3: Performance - 5/12 */}
            <motion.div 
              variants={fadeUp}
              className="md:col-span-5 group relative bg-white rounded-[3rem] border border-stone-200/60 p-10 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(179,75,68,0.06)] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-stone-400 font-medium block mb-8">Performance & Vitesse</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#2D2926] tracking-tighter leading-tight">
                    Optimise pour une <span className="text-[#B34B44]">fluidite</span> sans compromis.
                  </h3>
                </div>
                <div className="mt-12">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] flex items-center justify-center text-[#B34B44] group-hover:scale-125 transition-transform duration-500">
                    <Lightning size={24} weight="duotone" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Box 4: Design - 7/12 */}
            <motion.div 
              variants={fadeUp}
              className="md:col-span-7 group relative bg-white rounded-[3rem] border border-stone-200/60 p-10 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(179,75,68,0.06)] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-stone-400 font-medium block mb-8">Experience Utilisateur</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#2D2926] tracking-tighter leading-tight max-w-xl">
                    Design sur mesure qui capture <span className="text-[#B34B44]">l&apos;essence</span> profonde de votre marque.
                  </h3>
                </div>
                <div className="mt-12 flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] flex items-center justify-center text-[#B34B44] group-hover:bg-[#B34B44] group-hover:text-white transition-all duration-500">
                    <UserFocus size={24} weight="duotone" />
                  </div>
                  <p className="text-sm text-stone-400 font-medium tracking-tight">Raffinement & Clarte</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Collaboration Vision Section */}
          <motion.div 
            variants={fadeUp}
            className="pt-16 md:pt-32 border-t border-stone-200/60"
          >
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Left Block: Client Expertise */}
              <motion.div 
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="group bg-white p-8 md:p-14 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] border border-stone-100 flex flex-col justify-between min-h-[400px] relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] flex items-center justify-center mb-10 border border-stone-100 text-[#2D2926]">
                    <HardHat size={28} weight="duotone" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-[#2D2926] tracking-tighter leading-[0.95] mb-8">
                    Votre Expertise <br />
                    <span className="text-[#B34B44]">Metier.</span>
                  </h3>
                  <p className="text-lg text-[#2D2926]/60 leading-relaxed max-w-[320px] font-medium">
                    Personne ne maitrise votre industrie mieux que vous. Vous apportez la connaissance terrain et les enjeux strategiques indispensables.
                  </p>
                </div>
                <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
                  <HardHat size={280} weight="thin" />
                </div>
              </motion.div>

              {/* Central Loop Connector */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-24 h-24 bg-[#FAF8F5] border-[10px] border-[#FAF8F5] rounded-full items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.12)]">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="p-4 bg-white rounded-full border border-stone-100 text-[#B34B44]"
                >
                  <ArrowsClockwise size={32} weight="bold" />
                </motion.div>
              </div>

              {/* Right Block: Digital Vision */}
              <motion.div 
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="group bg-[#2D2926] p-8 md:p-14 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(45,41,38,0.3)] flex flex-col justify-between min-h-[400px] relative overflow-hidden text-[#FAF8F5]"
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-10 backdrop-blur-md text-[#B34B44]">
                    <Lightning size={28} weight="fill" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[0.95] mb-8">
                    Ma Vision <br />
                    <span className="text-[#B34B44]">Digitale.</span>
                  </h3>
                  <p className="text-lg text-[#FAF8F5]/60 leading-relaxed max-w-[320px] font-medium">
                    Je traduis vos ambitions en outils de haute precision, transformant votre savoir-faire en une experience numerique d&apos;exception.
                  </p>
                </div>
                <div className="absolute -right-10 -bottom-10 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-700 pointer-events-none">
                  <Lightning size={280} weight="thin" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
