import type { MetadataRoute } from 'next'
import { getContentSlugs } from '@/lib/content'

const BASE = 'https://adminsignal.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: 'daily' },

    // Content listing pages
    { url: `${BASE}/news`, priority: 0.9, changeFrequency: 'daily' },
    { url: `${BASE}/tutorials`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/troubleshooting`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/scripts`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/reviews`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/comparisons`, priority: 0.9, changeFrequency: 'weekly' },

    // Topic hubs
    { url: `${BASE}/intune`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/powershell`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/windows-server`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/endpoint-security`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/microsoft-365`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/microsoft-entra-id`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/patch-management`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/group-policy`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/sccm-mecm`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/best-tools`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/topics`, priority: 0.7, changeFrequency: 'weekly' },

    // Site / trust pages
    { url: `${BASE}/about`, priority: 0.5, changeFrequency: 'monthly' },
    { url: `${BASE}/contact`, priority: 0.5, changeFrequency: 'monthly' },
    { url: `${BASE}/advertise`, priority: 0.5, changeFrequency: 'monthly' },
    { url: `${BASE}/editorial-policy`, priority: 0.4, changeFrequency: 'yearly' },
    { url: `${BASE}/privacy`, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${BASE}/terms`, priority: 0.3, changeFrequency: 'yearly' },
  ]

  const contentTypes = [
    { type: 'tutorials', segment: 'tutorials', priority: 0.8 },
    { type: 'news', segment: 'news', priority: 0.8 },
    { type: 'troubleshooting', segment: 'troubleshooting', priority: 0.8 },
    { type: 'scripts', segment: 'scripts', priority: 0.7 },
    { type: 'reviews', segment: 'reviews', priority: 0.7 },
    { type: 'comparisons', segment: 'comparisons', priority: 0.7 },
  ] as const

  const dynamicRoutes: MetadataRoute.Sitemap = contentTypes.flatMap(
    ({ type, segment, priority }) =>
      getContentSlugs(type).map((slug) => ({
        url: `${BASE}/${segment}/${slug}`,
        priority,
        changeFrequency: 'monthly' as const,
      }))
  )

  return [...staticRoutes, ...dynamicRoutes]
}
