"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { m, AnimatePresence } from 'framer-motion';
import { useState, useTransition, useEffect } from 'react';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Optimistic locale: updates instantly on click, syncs back once nav completes
  const [optimisticLocale, setOptimisticLocale] = useState(locale);

  // Keep in sync if locale changes from outside (e.g. back/forward)
  useEffect(() => {
    setOptimisticLocale(locale);
  }, [locale]);

  // Prefetch the other locale so the switch is near-instant
  useEffect(() => {
    const other = locale === 'en' ? 'fr' : 'en';
    router.prefetch(pathname, { locale: other });
  }, [locale, pathname, router]);

  const locales = [
    { id: 'en', label: 'EN' },
    { id: 'fr', label: 'FR' }
  ];

  const handleLocaleChange = (newLocale: "en" | "fr") => {
    if (newLocale === optimisticLocale) return;
    // Instant visual feedback
    setOptimisticLocale(newLocale);
    // Non-blocking navigation — UI stays interactive while route loads
    startTransition(() => {
      router.replace(pathname, { locale: newLocale, scroll: false });
    });
  };

  return (
    <m.div
      initial={false}
      animate={{ y: 0, opacity: isPending ? 0.7 : 1 }}
      transition={{ duration: 0.15 }}
      className="backdrop-blur-md bg-white/80 dark:bg-[#242220]/80 border border-stone-200/60 dark:border-white/[0.07] p-0.5 md:p-1 rounded-full flex items-center gap-0.5 md:gap-1 shadow-sm overflow-hidden"
      style={{ boxShadow: '0 4px 12px -2px rgba(45, 41, 38, 0.05)' }}
    >
      {locales.map((l) => {
          const isActive = optimisticLocale === l.id;

          return (
            <button
              key={l.id}
              aria-label={`Switch to ${l.label === "FR" ? "French" : "English"}`}
              onClick={() => handleLocaleChange(l.id as "en" | "fr")}
              onMouseEnter={() => setHovered(l.id)}
              onMouseLeave={() => setHovered(null)}
              className={`relative px-2.5 md:px-3.5 py-1.5 rounded-full text-[9px] md:text-[10px] font-bold tracking-[0.1em] md:tracking-[0.15em] transition-colors duration-200 outline-none uppercase ${isActive ? 'text-[#FAF8F5]' : 'text-[#5C5652] dark:text-[#A8A29E]'}`}
            >
              {/* Active Background Pill */}
              {isActive && (
                <m.div
                  layoutId="activeLocale"
                  initial={false}
                  className="absolute inset-0 z-0 rounded-full"
                  style={{ backgroundColor: '#B34B44' }}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                />
              )}

              {/* Hover Indicator */}
              <AnimatePresence>
                {hovered === l.id && !isActive && (
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-[-1] rounded-full bg-[#2D2926]/5 dark:bg-white/[0.05]"
                  />
                )}
              </AnimatePresence>

              <span className="relative z-10">{l.label}</span>
            </button>
          );
        })}
      </m.div>
    );
}
