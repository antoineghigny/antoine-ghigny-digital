"use client";

import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { LazyMotion, domAnimation } from "framer-motion";

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
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </NextIntlClientProvider>
  );
}
