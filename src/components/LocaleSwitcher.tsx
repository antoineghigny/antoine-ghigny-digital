"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  const locales = [
    { id: 'en', label: 'EN' },
    { id: 'fr', label: 'FR' }
  ];

  const handleLocaleChange = (newLocale: "en" | "fr") => {
    if (newLocale === locale) return;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="fixed top-8 right-8 z-[100]">
      <div 
        className="backdrop-blur-md bg-white/70 border border-white/20 p-1.5 rounded-full flex items-center gap-1 shadow-sm"
        style={{ boxShadow: '0 4px 20px -5px rgba(45, 41, 38, 0.05)' }}
      >
        {locales.map((l) => {
          const isActive = locale === l.id;
          
          return (
            <button
              key={l.id}
              onClick={() => handleLocaleChange(l.id as "en" | "fr")}
              onMouseEnter={() => setHovered(l.id)}
              onMouseLeave={() => setHovered(null)}
              className="relative px-3 py-1.5 rounded-full text-[11px] font-medium tracking-widest transition-all duration-300 outline-none"
              style={{ 
                color: isActive ? '#FAF8F5' : '#5C5652',
              }}
            >
              {/* Active Background Pill */}
              {isActive && (
                <motion.div
                  layoutId="activeLocale"
                  className="absolute inset-0 z-0 rounded-full"
                  style={{ backgroundColor: '#B34B44' }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Hover Indicator */}
              <AnimatePresence>
                {hovered === l.id && !isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 z-[-1] rounded-full bg-[#2D2926]/5"
                  />
                )}
              </AnimatePresence>

              <span className="relative z-10">{l.label}</span>
            </button>
          );
        })}
      </div>
      
      {/* Subtle bottom indicator line for the fixed element depth */}
      <motion.div 
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-[1px] opacity-20"
        style={{ backgroundColor: '#2D2926' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5 }}
      />
    </div>
  );
}
