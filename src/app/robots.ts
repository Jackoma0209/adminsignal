import type { MetadataRoute } from 'next'

// Retired public routes must remain crawlable so removal responses can be seen.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/search', '/api/'] },
    sitemap: 'https://www.adminsignal.com/sitemap.xml',
  }
}
