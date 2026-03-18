import { getMessages, getTranslations } from "next-intl/server";
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
  preload: false,
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: 'swap',
  preload: false,
});

// A simple client-only component for the noise background to prevent hydration issues
function ClientNoise() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] contrast-150 brightness-150 mix-blend-multiply bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" 
    />
  );
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const baseUrl = "https://antoine-ghigny-digital.vercel.app";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t("title"),
      template: `%s | Antoine Ghigny`,
    },
    description: t("description"),
    keywords: ["web design", "Nivelles", "Belgique", "freelance", "PME", "site web sur mesure", "landing page"],
    authors: [{ name: "Antoine Ghigny", url: baseUrl }],
    creator: "Antoine Ghigny",
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_BE" : "en_US",
      url: `${baseUrl}/${locale}`,
      title: t("title"),
      description: t("description"),
      siteName: "Antoine Ghigny · Digital Creation",
      images: [
        {
          url: "/og-image.jpg", // Créer cette image dans /public
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      creator: "@antoineghigny", // Votre handle Twitter si existant
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        fr: `${baseUrl}/fr`,
        en: `${baseUrl}/en`,
      },
    },
    verification: {
      google: "6u__m6RbbQ7KptTxLp8UfXzZYZLRwU0G03hO7xLWnUk",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export const viewport = {
  themeColor: "#FAF8F5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Pre-load critical translations for the whole layout
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-[#B34B44]/20 selection:text-[#B34B44] bg-[#FAF8F5]`}
        suppressHydrationWarning
      >
        <ClientNoise />
        <Providers locale={locale} messages={messages}>
          {children}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
