import { MetadataRoute } from 'next';

const baseUrl = 'https://antoine-ghigny-digital.vercel.app';
const locales = ['fr', 'en'];

// Legal and privacy pages excluded — no SEO value, avoid crawl budget waste
const indexablePages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '',       priority: 1.0, changeFrequency: 'weekly'  },
  { path: '/faq',   priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePages.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }))
  );
}
