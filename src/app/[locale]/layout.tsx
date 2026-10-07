import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import "../globals.css";
import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: 'swap',
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: 'swap',
  preload: false,
});

const remaSans = localFont({
  src: "../fonts/DMSans-Variable.ttf",
  variable: "--font-rema-sans",
  weight: "100 900",
  display: "swap",
});
const remaSerif = localFont({
  src: "../fonts/Newsreader-Variable.ttf",
  variable: "--font-rema-serif",
  weight: "200 800",
  display: "swap",
});

// A simple client-only component for the noise background to prevent hydration issues
function ClientNoise() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] dark:opacity-[0.04] contrast-150 brightness-150 mix-blend-multiply dark:mix-blend-soft-light bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" 
    />
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "rema.metadata" });
  const baseUrl = "https://antoineghigny.be";

  return {
    metadataBase: new URL(baseUrl),
    title: { default: t("title"), template: "%s | Rema" },
    description: t("description"),
    keywords: locale === "fr"
      ? ["Rema", "journal de rêves", "rêves récurrents", "réflexion personnelle", "journal iPhone", "Antoine Ghigny"]
      : ["Rema", "dream journal", "recurring dreams", "personal reflection", "iPhone journal", "Antoine Ghigny"],
    authors: [{ name: "Antoine Ghigny", url: baseUrl + "/" + locale + "/about" }],
    creator: "Antoine Ghigny",
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_BE" : "en_US",
      url: baseUrl + "/" + locale,
      title: t("title"),
      description: t("description"),
      siteName: "Rema",
      images: [{ url: "/rema/social-" + locale + ".png", width: 1200, height: 630, alt: t("title") }],
    },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description"), images: ["/rema/social-" + locale + ".png"] },
    alternates: {
      canonical: baseUrl + "/" + locale,
      languages: { fr: baseUrl + "/fr", en: baseUrl + "/en", "x-default": baseUrl + "/fr" },
    },
    verification: { google: "6u__m6RbbQ7KptTxLp8UfXzZYZLRwU0G03hO7xLWnUk" },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large" as const, "max-snippet": -1 } },
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export const viewport = {
  themeColor: "#070809",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "fr" && locale !== "en") notFound();
  setRequestLocale(locale);
  // Pre-load critical translations for the whole layout
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme"),d=window.matchMedia("(prefers-color-scheme:dark)").matches;if(t==="dark"||(!t&&d))document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${remaSans.variable} ${remaSerif.variable} antialiased selection:bg-[#B34B44]/20 selection:text-[#B34B44] bg-[#FAF8F5] dark:bg-[#1A1816]`}
      >
        <ClientNoise />
        <Providers locale={locale} messages={{ rema: messages.rema }}>
          {/* overflow-x-hidden on a div (not body/html) — the only reliable iOS Safari fix */}
          <div className="overflow-x-hidden">
            {children}
          </div>
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
