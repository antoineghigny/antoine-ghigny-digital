# Design System — Antoine Ghigny

## Chosen Vibe: Warm Asymmetric (Vibe D)

### Palette
- Background: `#FAF8F5` (warm cream/stone)
- Text primary: `#2D2926` (warm off-black)
- Text secondary: `#5C5652` (warm gray)
- Text muted: stone-400/stone-500
- Accent: `#B34B44` (terracotta/deep rose)
- Accent hover: `#963f39`
- Accent shadow: `shadow-[#B34B44]/20`
- Borders: `border-[#2D2926]/5` or `border-stone-200`

### Typography
- Font: Satoshi (via fontshare) or system Geist
- Headlines: `text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]`
- Body: `text-lg md:text-xl text-[#5C5652] leading-relaxed font-light max-w-[65ch]`
- Labels: `text-xs uppercase tracking-widest font-medium text-[#B34B44]`
- Small text: `text-sm font-medium text-[#5C5652] tracking-tight`

### Layout
- Container: `max-w-[1400px] mx-auto px-4 md:px-12`
- Full height: `min-h-[100dvh]` (NEVER h-screen)
- Grid: `grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20`
- Asymmetric split: 5-col / 7-col
- Mobile: strict single column `w-full px-4 py-8`

### Components
- Primary CTA: `bg-[#B34B44] text-white px-10 py-5 rounded-full font-medium text-lg shadow-lg shadow-[#B34B44]/20 hover:bg-[#963f39] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto`
- Secondary CTA: `px-10 py-5 rounded-full font-medium text-lg border border-[#2D2926]/10 text-[#2D2926] hover:bg-[#2D2926] hover:text-white active:scale-[0.98] transition-all duration-300 w-full sm:w-auto`
- Trust markers: Phosphor icons (CheckCircle, fill weight) + text, separated by `gap-x-10`
- Shadows: warm-tinted `shadow-[0_20px_60px_-15px_rgba(179,75,68,0.15)]`
- Rounded surfaces: `rounded-2xl` for major containers
- Selection: `selection:bg-[#B34B44]/20 selection:text-[#B34B44]`

### Motion
- Spring physics: `type: "spring", stiffness: 100, damping: 20`
- Fade in up: `initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }`
- Stagger children: `staggerChildren: 0.1`
- Easing: `[0.21, 0.45, 0.32, 0.9]`
- Scroll reveal: `whileInView` with `viewport: { once: true }`
- Tactile feedback: `active:scale-[0.98]`

### Rules
- NO emojis (use Phosphor icons)
- NO centered hero
- NO 3-column card layouts
- NO pure black (#000)
- NO Inter font
- NO neon/outer glows
- NO Unsplash (use picsum.photos)
- NO filler copy ("Elevate", "Seamless", "Unleash")
- Max 1 accent color (terracotta)
- One clear message per viewport/screen

### Reference Code (Vibe D Hero)
```tsx
"use client";
import React from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { CheckCircle } from "@phosphor-icons/react";

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

export default function VibeDWarmAsymmetric() {
  return (
    <section className="min-h-[100dvh] bg-[#FAF8F5] flex items-center overflow-hidden selection:bg-[#B34B44]/20 selection:text-[#B34B44]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-12 md:py-24 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.21, 0.45, 0.32, 0.9] }}
            className="hidden md:block md:col-span-5 relative aspect-[2/3] group"
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(179,75,68,0.15)] transition-transform duration-700 group-hover:scale-[1.02]">
              <Image
                src="https://picsum.photos/seed/studio/600/900"
                alt="Studio portrait"
                fill
                priority
                className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-[#B34B44]/5 mix-blend-multiply" />
            </div>
          </m.div>
          <m.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="md:col-span-7 flex flex-col space-y-8"
          >
            <m.div {...fadeInUp} className="flex flex-col space-y-4">
              <span className="text-[#B34B44] font-medium tracking-widest text-xs uppercase">
                Creation digitale — Bruxelles
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#2D2926] leading-[1.05] tracking-tight">
                Votre site web.<br />
                <span className="font-light">Enfin bien fait.</span>
              </h1>
            </m.div>
            <m.p
              {...fadeInUp}
              className="text-lg md:text-xl text-[#5C5652] max-w-2xl leading-relaxed font-light"
            >
              Je concois des experiences numeriques qui allient esthetique editoriale et performance technique.
            </m.p>
            <m.div {...fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-[#B34B44] text-white px-10 py-5 rounded-full font-medium text-lg shadow-lg shadow-[#B34B44]/20 hover:bg-[#963f39] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto">
                Demander un audit gratuit
              </button>
              <button className="px-10 py-5 rounded-full font-medium text-lg border border-[#2D2926]/10 text-[#2D2926] hover:bg-[#2D2926] hover:text-white active:scale-[0.98] transition-all duration-300 w-full sm:w-auto">
                Voir les projets
              </button>
            </m.div>
            <m.div
              {...fadeInUp}
              className="pt-8 border-t border-[#2D2926]/5 flex flex-wrap gap-x-10 gap-y-4"
            >
              {["Sites performants", "Automatisation", "Support reactif"].map((text) => (
                <div key={text} className="flex items-center gap-2">
                  <CheckCircle size={22} weight="fill" className="text-[#B34B44]" />
                  <span className="text-sm font-medium text-[#5C5652] tracking-tight">{text}</span>
                </div>
              ))}
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
```
