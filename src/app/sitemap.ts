import { MetadataRoute } from 'next';

const baseUrl = 'https://antoine-ghigny-digital.vercel.app';
const locales = ['fr', 'en'];
const pages = ['', '/legal', '/privacy', '/faq', '/about'];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1 : 0.5,
    }))
  );

  return routes;
}
