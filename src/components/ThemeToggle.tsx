"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { Sun, Moon } from "@phosphor-icons/react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <div className="w-[36px] md:w-[42px] h-[30px] md:h-[34px] rounded-full backdrop-blur-md bg-white/80 border border-stone-200/60 shadow-sm" />
    );
  }

  return (
    <m.button
      onClick={toggle}
      whileTap={{ scale: 0.92 }}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="backdrop-blur-md bg-white/80 dark:bg-[#242220]/80 border border-stone-200/60 dark:border-white/10 px-2.5 md:px-3 py-1.5 rounded-full flex items-center justify-center shadow-sm transition-colors hover:border-stone-300 dark:hover:border-white/20"
    >
      {dark ? (
        <Sun size={14} weight="bold" className="text-[#B34B44]" />
      ) : (
        <Moon size={14} weight="bold" className="text-[#5C5652]" />
      )}
    </m.button>
  );
}
