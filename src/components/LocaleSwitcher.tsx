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
    router.replace(pathname, { locale: newLocale, scroll: false });
  };

  return (
    <div className="fixed top-8 right-8 z-[100]">
      <motion.div 
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        className="backdrop-blur-md bg-white/80 border border-white/20 p-1 rounded-full flex items-center gap-1 shadow-sm overflow-hidden"
        style={{ boxShadow: '0 8px 32px -4px rgba(45, 41, 38, 0.08)' }}
      >
        {locales.map((l) => {
          const isActive = locale === l.id;
          
          return (
            <button
              key={l.id}
              onClick={() => handleLocaleChange(l.id as "en" | "fr")}
              onMouseEnter={() => setHovered(l.id)}
              onMouseLeave={() => setHovered(null)}
              className="relative px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.15em] transition-colors duration-200 outline-none uppercase"
              style={{ 
                color: isActive ? '#FAF8F5' : '#5C5652',
              }}
            >
              {/* Active Background Pill */}
              {isActive && (
                <motion.div
                  layoutId="activeLocale"
                  initial={false}
                  className="absolute inset-0 z-0 rounded-full"
                  style={{ backgroundColor: '#B34B44' }}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}

              {/* Hover Indicator */}
              <AnimatePresence>
                {hovered === l.id && !isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-[-1] rounded-full bg-[#2D2926]/5"
                  />
                )}
              </AnimatePresence>

              <span className="relative z-10">{l.label}</span>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}
