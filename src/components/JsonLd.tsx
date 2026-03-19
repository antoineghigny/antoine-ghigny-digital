export default function JsonLd({ 
  locale, 
  type = "ProfessionalService" 
}: { 
  locale: string;
  type?: "ProfessionalService" | "WebPage"
}) {
  const baseUrl = "https://antoine-ghigny-digital.vercel.app";
  const currentUrl = `${baseUrl}/${locale}`;

  // Direct descriptions to avoid async issues in components
  const description = locale === 'fr' 
    ? "Conception de sites web et landing pages sur mesure pour indépendants et PME. Basé à Nivelles, Belgique."
    : "Bespoke website and landing page design for freelancers and SMEs. Based in Nivelles, Belgium.";

  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
    "name": type === "ProfessionalService" ? "Antoine Ghigny · Digital Creation" : undefined,
    "image": `${baseUrl}/og-image.jpg`,
    "@id": currentUrl,
    "url": currentUrl,
    "description": description,
    "inLanguage": locale,
  };

  const professionalSchema = type === "ProfessionalService" ? {
    "telephone": "+32 475 91 13 74",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Chaussée de Braine le Comte, 70",
      "addressLocality": "Nivelles",
      "postalCode": "1400",
      "addressCountry": "BE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 50.5977,
      "longitude": 4.3232
    },
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": ["https://www.linkedin.com/in/antoine-ghigny-9b88a9252"]
  } : {};

  const pageSchema = type === "WebPage" ? {
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    }
  } : {};

  const schema = { ...baseSchema, ...professionalSchema, ...pageSchema };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}