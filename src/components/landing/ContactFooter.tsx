"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";

const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
};

export default function ContactFooter() {
  return (
    <footer className="bg-[#FAF8F5] selection:bg-[#B34B44] selection:text-white">
      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 md:py-40 bg-white rounded-t-[3rem] md:rounded-t-[5rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.03)]"
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 w-full">
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.1, ...SPRING }}
            className="flex flex-col md:flex-row gap-16 md:gap-24 items-start"
          >
            {/* Left side: Heading */}
            <div className="flex-1 space-y-8">
              <motion.span
                variants={fadeUp}
                className="text-xs uppercase tracking-widest font-medium text-[#B34B44]"
              >
                Premier pas
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="text-5xl md:text-8xl font-bold tracking-tight text-[#2D2926] leading-[0.95] lg:leading-[1.1] max-w-[12ch]"
              >
                Parlons de votre projet.
              </motion.h2>
            </div>

            {/* Right side: Action */}
            <div className="flex-1 space-y-10 pt-4 md:pt-16">
              <motion.p
                variants={fadeUp}
                className="text-xl md:text-2xl text-[#5C5652] leading-relaxed font-light max-w-[40ch]"
              >
                Un premier echange gratuit de 30 minutes pour comprendre vos
                besoins et vous proposer une solution concrete.
              </motion.p>
              
              <motion.div variants={fadeUp} className="space-y-6">
                <a
                  href="mailto:hello@antoineghigny.be?subject=Demande%20d%27audit%20gratuit"
                  className="inline-flex items-center justify-center gap-3 bg-[#B34B44] text-white px-10 py-6 rounded-full font-medium text-xl shadow-2xl shadow-[#B34B44]/30 hover:bg-[#963f39] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 group"
                >
                  Reserver mon appel gratuit
                  <ArrowRight weight="bold" size={24} className="group-hover:translate-x-1 transition-transform" />
                </a>
                
                <div className="flex items-center gap-3 px-6">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-sm text-[#5C5652] font-medium tracking-wide">
                    Sans engagement — Disponible cette semaine
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Legal Footer */}
      <div className="bg-white py-12 border-t border-stone-100">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
            <p className="text-xs text-stone-500 tracking-wide font-medium">
              &copy; 2026 Antoine Ghigny. Tous droits reserves.
            </p>
            <div className="flex items-center gap-10">
              <a
                href="#"
                className="text-xs text-stone-500 hover:text-[#B34B44] transition-colors duration-300 tracking-wide font-medium uppercase"
              >
                Mentions legales
              </a>
              <span className="w-px h-3 bg-stone-200 hidden md:block" />
              <a
                href="#"
                className="text-xs text-stone-500 hover:text-[#B34B44] transition-colors duration-300 tracking-wide font-medium uppercase"
              >
                Politique de confidentialite
              </a>
            </div>
            <p className="text-xs text-stone-400 font-[family-name:var(--font-geist-mono)] tracking-wider">
              TVA BE0XXX.XXX.XXX
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
