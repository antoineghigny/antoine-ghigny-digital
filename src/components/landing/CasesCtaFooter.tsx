"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, PaperPlaneTilt, CheckCircle } from "@phosphor-icons/react";

const springConfig = { type: "spring" as const, stiffness: 100, damping: 20 };

const fadeUpVariant = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } },
};

const CaseStudyRow = ({
  industry,
  result,
  description,
  image,
  reverse = false,
}: {
  industry: string;
  result: string;
  description: string;
  image: string;
  reverse?: boolean;
}) => (
  <motion.div
    {...fadeUpVariant}
    transition={springConfig}
    className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-20 items-center mb-24 md:mb-40"
  >
    <div className={`col-span-1 md:col-span-7 ${reverse ? "md:order-2" : "md:order-1"}`}>
      <div className="relative group overflow-hidden rounded-2xl shadow-[0_20px_60px_-15px_rgba(179,75,68,0.15)]">
        <img
          src={image}
          alt={industry}
          className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[#2D2926]/5 group-hover:bg-transparent transition-colors duration-500" />
      </div>
    </div>
    <div className={`col-span-1 md:col-span-5 flex flex-col justify-center ${reverse ? "md:order-1" : "md:order-2"}`}>
      <span className="text-xs uppercase tracking-widest font-medium text-[#B34B44] mb-4">{industry}</span>
      <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[#2D2926] mb-4 leading-tight">{result}</h3>
      <p className="text-lg md:text-xl text-[#5C5652] leading-relaxed font-light max-w-[40ch]">{description}</p>
      <motion.div
        whileHover={{ x: 5 }}
        className="mt-8 flex items-center gap-2 text-[#2D2926] font-medium cursor-pointer group"
      >
        <span>Voir le projet</span>
        <ArrowRight weight="bold" className="text-[#B34B44] transition-transform group-hover:translate-x-1" />
      </motion.div>
    </div>
  </motion.div>
);

export default function CasesCtaFooter() {
  return (
    <>
      {/* CASE STUDIES */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-12 py-32 md:py-48">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20 md:mb-32"
        >
          <motion.span
            {...fadeUpVariant}
            transition={springConfig}
            className="text-xs uppercase tracking-widest font-medium text-[#B34B44] mb-4 block"
          >
            Cas concrets
          </motion.span>
          <motion.h2
            {...fadeUpVariant}
            transition={springConfig}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-[#2D2926] max-w-[15ch]"
          >
            Vous expliquez, je propose.
          </motion.h2>
        </motion.div>

        <div className="flex flex-col">
          <CaseStudyRow
            industry="Boulangerie artisanale"
            result="Commandes en ligne +240%"
            description="Creation d'une boutique digitale et optimisation du parcours client pour les commandes de matinee."
            image="https://picsum.photos/seed/boulangerie/800/600"
          />
          <CaseStudyRow
            industry="Coach en nutrition"
            result="Prise de RDV x4"
            description="Refonte totale de l'identite visuelle et mise en place d'un tunnel de conversion vers la consultation initiale."
            image="https://picsum.photos/seed/coach/800/600"
            reverse
          />
          <CaseStudyRow
            industry="Cabinet comptable"
            result="Demandes de devis +85%"
            description="Modernisation de l'image de marque et simplification du formulaire de contact pour des leads qualifies."
            image="https://picsum.photos/seed/comptable/800/600"
          />
        </div>
      </section>

      {/* CTA / CONTACT */}
      <section className="min-h-[100dvh] bg-white flex items-center border-y border-stone-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-24 w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-start">
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="col-span-1 md:col-span-7"
            >
              <motion.span
                {...fadeUpVariant}
                transition={springConfig}
                className="text-xs uppercase tracking-widest font-medium text-[#B34B44] mb-4 block"
              >
                Premier pas
              </motion.span>
              <motion.h2
                {...fadeUpVariant}
                transition={springConfig}
                className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-[#2D2926] mb-8"
              >
                Parlons de votre projet.
              </motion.h2>
              <motion.p
                {...fadeUpVariant}
                transition={springConfig}
                className="text-lg md:text-xl text-[#5C5652] leading-relaxed font-light max-w-[50ch] mb-12"
              >
                Un premier echange gratuit de 30 minutes pour comprendre vos besoins et vous proposer une solution concrete.
              </motion.p>

              <motion.div {...fadeUpVariant} transition={springConfig} className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FAF8F5] flex items-center justify-center flex-shrink-0">
                    <CheckCircle weight="fill" className="text-[#B34B44] text-xl" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#2D2926]">Analyse de vos objectifs</h4>
                    <p className="text-sm text-[#5C5652]">Comprendre exactement ce que vous voulez accomplir.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FAF8F5] flex items-center justify-center flex-shrink-0">
                    <CheckCircle weight="fill" className="text-[#B34B44] text-xl" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#2D2926]">Strategie personnalisee</h4>
                    <p className="text-sm text-[#5C5652]">Un plan d&apos;action clair sans jargon technique.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* FORM */}
            <motion.div
              {...fadeUpVariant}
              transition={springConfig}
              className="col-span-1 md:col-span-5 bg-[#FAF8F5] p-8 md:p-10 rounded-2xl border border-stone-200 shadow-sm"
            >
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-[#2D2926]">Nom</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Votre nom complet"
                    className="bg-white border border-stone-200 rounded-xl px-4 py-3 focus:border-[#B34B44] focus:ring-1 focus:ring-[#B34B44]/20 outline-none transition-all placeholder:text-stone-400"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-[#2D2926]">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="adresse@email.com"
                    className="bg-white border border-stone-200 rounded-xl px-4 py-3 focus:border-[#B34B44] focus:ring-1 focus:ring-[#B34B44]/20 outline-none transition-all placeholder:text-stone-400"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-[#2D2926]">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Parlez-moi de votre projet..."
                    className="bg-white border border-stone-200 rounded-xl px-4 py-3 focus:border-[#B34B44] focus:ring-1 focus:ring-[#B34B44]/20 outline-none transition-all placeholder:text-stone-400 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#B34B44] text-white px-10 py-5 rounded-full font-medium text-lg shadow-lg shadow-[#B34B44]/20 hover:bg-[#963f39] active:scale-[0.98] transition-all duration-300 w-full flex items-center justify-center gap-3 group"
                >
                  <span>Envoyer</span>
                  <PaperPlaneTilt weight="bold" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
              <div className="mt-8 text-center">
                <p className="text-xs text-[#5C5652] tracking-tight">
                  Ou directement par email:{" "}
                  <a href="mailto:hello@antoineghigny.be" className="text-[#B34B44] font-medium hover:underline">
                    hello@antoineghigny.be
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LEGAL FOOTER */}
      <footer className="bg-[#FAF8F5] border-t border-stone-200 py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-xs text-stone-500 font-medium order-2 md:order-1">
              &copy; 2026 Antoine Ghigny. Tous droits reserves.
            </div>
            <div className="flex items-center gap-6 text-xs text-stone-500 font-medium order-1 md:order-2">
              <a href="#" className="hover:text-[#B34B44] transition-colors">Mentions legales</a>
              <span className="text-stone-300">|</span>
              <a href="#" className="hover:text-[#B34B44] transition-colors">Politique de confidentialite</a>
            </div>
            <div className="text-xs text-stone-400 font-medium order-3">
              TVA BE0XXX.XXX.XXX
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
