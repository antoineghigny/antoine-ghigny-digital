import { getMessages, getTranslations } from "next-intl/server";
import localFont from "next/font/local";
import "../globals.css";
import Providers from "@/components/Providers";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "metadata" });
 
  return {
    title: t("title"),
    description: t("description")
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // We explicitly fetch messages for the current locale
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-[#B34B44]/20 selection:text-[#B34B44]`}
      >
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] contrast-150 brightness-150 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
