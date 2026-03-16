import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Antoine Ghigny · Creation digitale",
  description: "Conception de sites web et landing pages sur mesure pour independants et PME. Base a Nivelles, Belgique.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-[#B34B44]/20 selection:text-[#B34B44]`}
      >
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] contrast-150 brightness-150 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        {children}
      </body>
    </html>
  );
}
