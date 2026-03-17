import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        // Optimisation spécifique pour les IA (ChatGPT, etc.)
        userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot'],
        allow: '/',
      }
    ],
    sitemap: 'https://antoine-ghigny-digital.vercel.app/sitemap.xml',
  };
}
