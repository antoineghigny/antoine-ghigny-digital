"use client";

import { m } from "framer-motion";
import { Sun, Moon } from "@phosphor-icons/react";
import { useTheme } from "./ThemeProvider";

const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };

export function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <m.button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="backdrop-blur-md bg-white/80 dark:bg-[#242220]/80 border border-stone-200/60 dark:border-white/10 p-0.5 md:p-1 rounded-full shadow-sm"
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative flex items-center">
        <m.div
          className="absolute top-0 bottom-0 w-1/2 bg-[#B34B44] rounded-full"
          animate={{ left: isDark ? "50%" : "0%" }}
          transition={SPRING}
        />
        <div className="relative z-10 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center">
          <Sun
            size={14}
            weight={!isDark ? "fill" : "regular"}
            className={`transition-colors duration-200 ${
              !isDark ? "text-white" : "text-stone-400 dark:text-stone-500"
            }`}
          />
        </div>
        <div className="relative z-10 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center">
          <Moon
            size={14}
            weight={isDark ? "fill" : "regular"}
            className={`transition-colors duration-200 ${
              isDark ? "text-white" : "text-stone-500"
            }`}
          />
        </div>
      </div>
    </m.button>
  );
}
