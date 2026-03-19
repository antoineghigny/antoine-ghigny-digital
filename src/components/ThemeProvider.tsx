"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type ThemeContextType = {
  isDark: boolean;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Sync React state with the class set by the inline script in layout
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  // Keep the dark class in sync — fixes locale switching removing it
  // when React re-renders the <html> element from the server
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      const root = document.documentElement;
      root.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      // Update theme-color meta tag
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", next ? "#1A1816" : "#FAF8F5");
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
