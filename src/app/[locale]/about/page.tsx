import { getTranslations } from "next-intl/server";
import AboutContent from "@/components/landing/AboutContent";

const BASE_URL = "https://antoineghigny.be";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const description =
    locale === "fr"
      ? "Antoine Ghigny, développeur web freelance à Nivelles, Belgique. Ingénieur logiciel avec expérience chez Accenture (Commission Européenne) et Proximus. Stack : Next.js, React, Java, Kubernetes."
      : "Antoine Ghigny, freelance web developer in Nivelles, Belgium. Software engineer with experience at Accenture (European Commission) and Proximus. Stack: Next.js, React, Java, Kubernetes.";

  return {
    title: t("title"),
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/about`,
      languages: {
        fr: `${BASE_URL}/fr/about`,
        en: `${BASE_URL}/en/about`,
      },
    },
  };
}

export default function AboutPage() {
  return <AboutContent />;
}
