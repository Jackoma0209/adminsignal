import { signals } from '@/data/signals'
import { guides } from '@/data/guides'
import { troubleshootingArticles } from '@/data/troubleshooting'
import {
  isNoindexHref,
  isNoindexNewsSlug,
  isNoindexTroubleshootingSlug,
} from '@/lib/noindex'
import type { TopicContentItem } from '@/components/templates/TopicHubPageTemplate'

interface TopicMatchConfig {
  newsTags?: string[]
  newsCategories?: string[]
  guideTags?: string[]
  guideCategories?: string[]
  troubleshootingCategories?: string[]
  affectedProducts?: string[]
  newsLimit?: number
  guideLimit?: number
  troubleshootingLimit?: number
}

function intersects(values: string[] | undefined, expected: string[] | undefined): boolean {
  if (!values?.length || !expected?.length) return false
  return expected.some((value) => values.includes(value))
}

export function buildTopicContent(config: TopicMatchConfig): {
  news: TopicContentItem[]
  tutorials: TopicContentItem[]
  troubleshooting: TopicContentItem[]
  allItems: TopicContentItem[]
} {
  const news = signals
    .filter((signal) => !isNoindexNewsSlug(signal.slug))
    .filter(
      (signal) =>
        intersects(signal.tags, config.newsTags) ||
        (config.newsCategories?.includes(signal.category) ?? false),
    )
    .slice(0, config.newsLimit ?? 3)
    .map((signal) => ({
      title: signal.title,
      href: `/news/${signal.slug}`,
      excerpt: signal.excerpt,
      meta: signal.date,
    }))

  const tutorials = guides
    .filter((guide) => {
      const href = guide.href ?? `/tutorials/${guide.slug}`
      return !isNoindexHref(href)
    })
    .filter(
      (guide) =>
        intersects(guide.tags, config.guideTags) ||
        (config.guideCategories?.includes(guide.category) ?? false),
    )
    .slice(0, config.guideLimit ?? 4)
    .map((guide) => ({
      title: guide.title,
      href: guide.href ?? `/tutorials/${guide.slug}`,
      excerpt: guide.excerpt,
      meta: `${guide.readTime} · ${guide.difficulty}`,
    }))

  const troubleshooting = troubleshootingArticles
    .filter((article) => !isNoindexTroubleshootingSlug(article.slug))
    .filter(
      (article) =>
        (config.troubleshootingCategories?.includes(article.category) ?? false) ||
        intersects(article.affectedProducts, config.affectedProducts),
    )
    .slice(0, config.troubleshootingLimit ?? 4)
    .map((article) => ({
      title: article.title,
      href: `/troubleshooting/${article.slug}`,
      excerpt: article.excerpt,
      meta: `${article.readTime} · ${article.difficulty}`,
    }))

  return {
    news,
    tutorials,
    troubleshooting,
    allItems: [...news, ...tutorials, ...troubleshooting],
  }
}
