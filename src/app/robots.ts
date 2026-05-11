import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        // AI search engines & LLM crawlers — explicit opt-in for indexing and citation
        userAgent: [
          // OpenAI / ChatGPT
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          // Anthropic / Claude
          'ClaudeBot',
          'anthropic-ai',
          'Claude-Web',
          // Google AI
          'Google-Extended',
          'Googlebot',
          // Perplexity
          'PerplexityBot',
          // Microsoft / Bing AI
          'Bingbot',
          // Apple / Siri
          'Applebot',
          'Applebot-Extended',
          // Meta AI
          'FacebookBot',
          // Common Crawl (training datasets)
          'CCBot',
          // Cohere
          'cohere-ai',
          // You.com
          'YouBot',
          // Mistral
          'MistralBot',
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://antoineghigny.be/sitemap.xml',
  };
}
