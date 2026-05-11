const BASE_URL = "https://antoineghigny.be";
const DATE_MODIFIED = new Date().toISOString().split("T")[0]; // build-time date

function getProfessionalServiceSchema(locale: string) {
  const url = `${BASE_URL}/${locale}`;
  const description =
    locale === "fr"
      ? "Stratégie, création de sites web sur mesure et accompagnement humain pour indépendants et PME. Basé à Nivelles, Belgique."
      : "Strategy, bespoke website development and human support for freelancers and SMEs. Based in Nivelles, Belgium.";

  return {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${BASE_URL}/#business`,
    name: "Antoine Ghigny · Digital Creation",
    url,
    description,
    image: `${BASE_URL}/og-image.png`,
    telephone: "+32 475 91 13 74",
    email: "antoine@ghigny.be",
    foundingDate: "2023",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Chaussée de Braine le Comte, 70",
      addressLocality: "Nivelles",
      postalCode: "1400",
      addressCountry: "BE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.5977,
      longitude: 4.3232,
    },
    priceRange: "€€",
    currenciesAccepted: "EUR",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: [
      { "@type": "City", name: "Nivelles" },
      { "@type": "City", name: "Bruxelles" },
      { "@type": "City", name: "Liège" },
      { "@type": "City", name: "Namur" },
      { "@type": "City", name: "Charleroi" },
      { "@type": "City", name: "Mons" },
      { "@type": "City", name: "Louvain-la-Neuve" },
      { "@type": "Country", name: "Belgium" },
    ],
    sameAs: ["https://www.linkedin.com/in/antoine-ghigny-9b88a9252"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "fr" ? "Stratégie & Sites Web Sur-Mesure" : "Strategy & Bespoke Websites",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: locale === "fr" ? "Création de site vitrine" : "Professional showcase website",
            description:
              locale === "fr"
                ? "Site web professionnel sur mesure avec stratégie d'offre et SEO intégré"
                : "Bespoke professional website with offer strategy and integrated SEO",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: locale === "fr" ? "Landing page" : "Landing page",
            description:
              locale === "fr"
                ? "Page d'atterrissage sur mesure avec message, preuves et conversion clarifiés"
                : "Bespoke landing page with clarified message, proof points and conversion path",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: locale === "fr" ? "Optimisation SEO & IA" : "SEO & AI Optimisation",
            description:
              locale === "fr"
                ? "Structuration SEO et IA pour rendre l'offre compréhensible par les moteurs et les clients"
                : "SEO and AI-search structuring so the offer is clear to search engines and clients",
          },
        },
      ],
    },
  };
}

function getPersonSchema() {
  return {
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
    name: "Antoine Ghigny",
    jobTitle: "Développeur Web Freelance & Software Engineer",
    url: BASE_URL,
    email: "antoine@ghigny.be",
    telephone: "+32 475 91 13 74",
    image: `${BASE_URL}/images/antoine.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nivelles",
      postalCode: "1400",
      addressCountry: "BE",
    },
    worksFor: {
      "@id": `${BASE_URL}/#business`,
    },
    knowsAbout: [
      "Web Development",
      "Next.js",
      "React",
      "TypeScript",
      "SEO",
      "Core Web Vitals",
      "Node.js",
      "Java",
      "Spring Boot",
      "Microservices",
      "Kubernetes",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "École Supérieure d'Informatique (ESI)",
      address: { "@type": "PostalAddress", addressLocality: "Bruxelles", addressCountry: "BE" },
    },
    sameAs: ["https://www.linkedin.com/in/antoine-ghigny-9b88a9252"],
  };
}

function getWebSiteSchema(locale: string) {
  const description =
    locale === "fr"
      ? "Stratégie, création de sites web sur mesure et accompagnement humain pour indépendants et PME. Basé à Nivelles, Belgique."
      : "Strategy, bespoke website development and human support for freelancers and SMEs. Based in Nivelles, Belgium.";

  return {
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Antoine Ghigny · Digital Creation",
    description,
    inLanguage: ["fr", "en"],
    dateModified: DATE_MODIFIED,
    author: { "@id": `${BASE_URL}/#person` },
    potentialAction: {
      "@type": "ContactAction",
      target: "mailto:antoine@ghigny.be",
      name: locale === "fr" ? "Contacter Antoine Ghigny" : "Contact Antoine Ghigny",
    },
  };
}

function getBreadcrumbSchema(locale: string) {
  const pages =
    locale === "fr"
      ? [
          { name: "Accueil", url: `${BASE_URL}/fr` },
          { name: "FAQ", url: `${BASE_URL}/fr/faq` },
          { name: "À propos", url: `${BASE_URL}/fr/about` },
        ]
      : [
          { name: "Home", url: `${BASE_URL}/en` },
          { name: "FAQ", url: `${BASE_URL}/en/faq` },
          { name: "About", url: `${BASE_URL}/en/about` },
        ];

  return {
    "@type": "BreadcrumbList",
    "@id": `${BASE_URL}/${locale}/#breadcrumb`,
    itemListElement: pages.map((page, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: page.name,
      item: page.url,
    })),
  };
}

export default function JsonLd({
  locale,
  type = "LocalBusiness",
}: {
  locale: string;
  type?: "LocalBusiness" | "WebPage";
}) {
  const schema =
    type === "ProfessionalService" || type === "LocalBusiness"
      ? {
          "@context": "https://schema.org",
          "@graph": [
            getProfessionalServiceSchema(locale),
            getPersonSchema(),
            getWebSiteSchema(locale),
            getBreadcrumbSchema(locale),
          ],
        }
      : {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${BASE_URL}/${locale}`,
          url: `${BASE_URL}/${locale}`,
          inLanguage: locale,
          isPartOf: { "@id": `${BASE_URL}/#website` },
          author: { "@id": `${BASE_URL}/#person` },
        };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
