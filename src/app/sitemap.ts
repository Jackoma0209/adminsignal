import type { MetadataRoute } from 'next'
import { getContentItem, getContentSlugs } from '@/lib/content'
import {
  getDuplicateTutorialRedirect,
  isNoindexContentRoute,
  isNoindexNewsSlug,
  isNoindexPath,
} from '@/lib/noindex'
import { liveSignals } from '@/data/signals'
import { guides } from '@/data/guides'
import { comparisons } from '@/data/comparisons'
import { troubleshootingArticles } from '@/data/troubleshooting'

const BASE = 'https://www.adminsignal.com'

function modificationDate(type: string, slug: string, fallback?: string) {
  const { frontmatter } = getContentItem(type, slug)
  const value = frontmatter.lastReviewed ?? frontmatter.date ?? fallback
  const date = new Date(String(value))
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
}

export default function sitemap(): MetadataRoute.Sitemap {
  const editorialCandidates: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1, changeFrequency: 'weekly' },
    { url: `${BASE}/news`, priority: 0.8, changeFrequency: 'daily' },
    { url: `${BASE}/tutorials`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/troubleshooting`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/comparisons`, priority: 0.4, changeFrequency: 'monthly' },
    { url: `${BASE}/templates`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE}/topics`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/intune`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/powershell`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/windows-server`, priority: 0.4, changeFrequency: 'monthly' },
    { url: `${BASE}/group-policy`, priority: 0.4, changeFrequency: 'monthly' },
    { url: `${BASE}/endpoint-security`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/microsoft-365`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/microsoft-entra-id`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/patch-management`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/sccm-mecm`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/about`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE}/contact`, priority: 0.5, changeFrequency: 'monthly' },
    { url: `${BASE}/editorial-policy`, priority: 0.4, changeFrequency: 'yearly' },
    { url: `${BASE}/privacy`, priority: 0.4, changeFrequency: 'yearly' },
    { url: `${BASE}/cookies`, priority: 0.4, changeFrequency: 'yearly' },
    { url: `${BASE}/terms`, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${BASE}/affiliate-disclosure`, priority: 0.3, changeFrequency: 'yearly' },
  ]
  const editorialRoutes = editorialCandidates.filter((entry) => {
    const path = entry.url.replace(BASE, '') || '/'
    return !isNoindexPath(path)
  })

  const articleTypes = [
    { type: 'tutorials', segment: 'tutorials', priority: 0.8 },
    { type: 'troubleshooting', segment: 'troubleshooting', priority: 0.8 },
    { type: 'comparisons', segment: 'comparisons', priority: 0.6 },
  ] as const

  const published = {
    tutorials: new Set(guides.filter(g => !g.href || g.href.startsWith('/tutorials/')).map(g => g.slug)),
    troubleshooting: new Set(troubleshootingArticles.map(a => a.slug)),
    comparisons: new Set(comparisons.map(a => a.slug)),
  }
  const articleRoutes: MetadataRoute.Sitemap = articleTypes.flatMap(
    ({ type, segment, priority }) =>
      getContentSlugs(type)
        .filter((slug) => published[type].has(slug))
        .filter((slug) => !isNoindexContentRoute(segment, slug))
        .filter((slug) => segment !== 'tutorials' || !getDuplicateTutorialRedirect(slug))
        .map((slug) => ({
          url: `${BASE}/${segment}/${slug}`,
          lastModified: modificationDate(type, slug),
          priority,
          changeFrequency: 'monthly' as const,
        })),
  )

  const newsRoutes: MetadataRoute.Sitemap = liveSignals
    .filter((signal) => getContentSlugs('news').includes(signal.slug))
    .filter((signal) => !isNoindexNewsSlug(signal.slug))
    .map((signal) => ({
      url: `${BASE}/news/${signal.slug}`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      lastModified: modificationDate('news', signal.slug, signal.publishedAt),
    }))

  const flagshipGuideRoutes: MetadataRoute.Sitemap = guides
    .filter((guide) => getContentSlugs('guides').includes(guide.slug))
    .filter((guide) => guide.href?.startsWith('/guides/'))
    .filter((guide) => !isNoindexContentRoute('guides', guide.slug))
    .map((guide) => ({
      url: `${BASE}${guide.href}`,
      priority: 0.9,
      changeFrequency: 'monthly' as const,
      lastModified: guide.publishedAt,
    }))

  return [...editorialRoutes, ...articleRoutes, ...newsRoutes, ...flagshipGuideRoutes]
}
