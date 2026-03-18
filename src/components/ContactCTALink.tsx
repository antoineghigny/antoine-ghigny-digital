"use client";

import { Link } from "@/i18n/navigation";
import { useCallback } from "react";

export default function ContactCTALink({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const handleClick = useCallback(() => {
    const tryScroll = (attempts: number) => {
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (attempts < 50) {
        requestAnimationFrame(() => tryScroll(attempts + 1));
      }
    };
    // Let the client-side navigation render the home page first
    setTimeout(() => tryScroll(0), 100);
  }, []);

  return (
    <Link href="/" scroll={false} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
