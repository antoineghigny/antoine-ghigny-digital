import { MetadataRoute } from 'next';

const baseUrl = 'https://antoineghigny.be';
const locales = ['fr', 'en'];

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '',       priority: 1.0, changeFrequency: 'weekly'  },
  { path: '/faq',   priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/legal', priority: 0.1, changeFrequency: 'yearly'  },
  { path: '/privacy', priority: 0.1, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr${path}`,
          en: `${baseUrl}/en${path}`,
        },
      },
    }))
  );
}
