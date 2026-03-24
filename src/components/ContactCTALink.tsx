"use client";

import { Link } from "@/i18n/navigation";
import { useCallback } from "react";
import { usePathname } from "@/i18n/navigation";
import { analytics } from "@/lib/analytics";

export default function ContactCTALink({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();

  const handleClick = useCallback(() => {
    analytics.contactCTAClicked(pathname);
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
  }, [pathname]);

  return (
    <Link href="/" scroll={false} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
