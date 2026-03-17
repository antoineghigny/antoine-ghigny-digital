import { getTranslations } from "next-intl/server";

export default async function JsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const tc = await getTranslations({ locale, namespace: "contact" });
  
  const baseUrl = "https://votre-domaine.be";

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Antoine Ghigny · Digital Creation",
    "image": `${baseUrl}/og-image.jpg`,
    "@id": `${baseUrl}/${locale}`,
    "url": `${baseUrl}/${locale}`,
    "telephone": tc("phone"),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nivelles",
      "addressCountry": "BE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 50.5977,
      "longitude": 4.3232
    },
    "description": t("description"),
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.linkedin.com/in/antoineghigny"
      // Ajoutez vos autres réseaux ici
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
