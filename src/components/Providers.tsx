"use client";

import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { LazyMotion, domAnimation } from "framer-motion";
import { ThemeProvider } from "./ThemeProvider";

export default function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="Europe/Brussels"
    >
      <ThemeProvider>
        <LazyMotion features={domAnimation} strict>
          {children}
        </LazyMotion>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
