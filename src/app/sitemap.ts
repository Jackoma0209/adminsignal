import type { MetadataRoute } from 'next'
import { getContentSlugs } from '@/lib/content'
import {
  getDuplicateTutorialRedirect,
  isNoindexContentRoute,
  isNoindexNewsSlug,
} from '@/lib/noindex'
import { liveSignals } from '@/data/signals'
import { guides } from '@/data/guides'

const BASE = 'https://www.adminsignal.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const editorialRoutes: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1, changeFrequency: 'weekly' },
    { url: `${BASE}/news`, priority: 0.8, changeFrequency: 'daily' },
    { url: `${BASE}/tutorials`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/troubleshooting`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/comparisons`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/topics`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/intune`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/powershell`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/windows-server`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/endpoint-security`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/microsoft-365`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/microsoft-entra-id`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/patch-management`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/group-policy`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/sccm-mecm`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/about`, priority: 0.5, changeFrequency: 'monthly' },
    { url: `${BASE}/editorial-policy`, priority: 0.4, changeFrequency: 'yearly' },
  ]

  const articleTypes = [
    { type: 'tutorials', segment: 'tutorials', priority: 0.8 },
    { type: 'troubleshooting', segment: 'troubleshooting', priority: 0.8 },
    { type: 'comparisons', segment: 'comparisons', priority: 0.6 },
  ] as const

  const articleRoutes: MetadataRoute.Sitemap = articleTypes.flatMap(
    ({ type, segment, priority }) =>
      getContentSlugs(type)
        .filter((slug) => !isNoindexContentRoute(segment, slug))
        .filter((slug) => segment !== 'tutorials' || !getDuplicateTutorialRedirect(slug))
        .map((slug) => ({
          url: `${BASE}/${segment}/${slug}`,
          priority,
          changeFrequency: 'monthly' as const,
        })),
  )

  const newsRoutes: MetadataRoute.Sitemap = liveSignals
    .filter((signal) => !isNoindexNewsSlug(signal.slug))
    .map((signal) => ({
      url: `${BASE}/news/${signal.slug}`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      lastModified: signal.publishedAt,
    }))

  const flagshipGuideRoutes: MetadataRoute.Sitemap = guides
    .filter((guide) => guide.href?.startsWith('/guides/'))
    .map((guide) => ({
      url: `${BASE}${guide.href}`,
      priority: 0.9,
      changeFrequency: 'monthly' as const,
      lastModified: guide.publishedAt,
    }))

  return [...editorialRoutes, ...articleRoutes, ...newsRoutes, ...flagshipGuideRoutes]
}
