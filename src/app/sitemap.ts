import { MetadataRoute } from 'next';

const defaultUrl = 'https://votre-domaine.be';
const locales = ['fr', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [''].flatMap((route) =>
    locales.map((locale) => ({
      url: `${defaultUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  );

  return routes;
}
