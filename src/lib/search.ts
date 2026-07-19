import { signals } from '@/data/signals'
import { guides } from '@/data/guides'
import { comparisons } from '@/data/comparisons'
import { topics } from '@/data/topics'
import { troubleshootingArticles } from '@/data/troubleshooting'
import {
  isNoindexComparisonSlug,
  isNoindexHref,
  isNoindexNewsSlug,
  isNoindexTroubleshootingSlug,
} from '@/lib/noindex'

export type ContentType =
  | 'news'
  | 'tutorial'
  | 'comparison'
  | 'troubleshooting'
  | 'topic'

export const TYPE_LABELS: Record<ContentType, string> = {
  news: 'News',
  tutorial: 'Tutorial',
  comparison: 'Comparison',
  troubleshooting: 'Troubleshooting',
  topic: 'Topic',
}

export interface SearchResult {
  title: string
  excerpt: string
  href: string
  type: ContentType
  meta?: string
}

interface IndexItem extends SearchResult {
  /** Pre-built lowercase blob for fast term matching */
  blob: string
  /** Lowercase title for phrase bonuses */
  titleLower: string
}

function buildIndex(): IndexItem[] {
  const items: IndexItem[] = []

  for (const signal of signals) {
    if (isNoindexNewsSlug(signal.slug)) continue

    const text = [
      signal.title,
      signal.slug,
      signal.excerpt,
      signal.category,
      signal.source ?? '',
      ...(signal.tags ?? []),
    ].join(' ')
    items.push({
      title: signal.title,
      excerpt: signal.excerpt,
      href: `/news/${signal.slug}`,
      type: 'news',
      meta: signal.date,
      titleLower: signal.title.toLowerCase(),
      blob: text.toLowerCase(),
    })
  }

  for (const guide of guides) {
    const href = guide.href ?? `/tutorials/${guide.slug}`
    if (isNoindexHref(href)) continue

    const text = [
      guide.title,
      guide.slug,
      guide.excerpt,
      guide.category,
      ...(guide.tags ?? []),
    ].join(' ')
    items.push({
      title: guide.title,
      excerpt: guide.excerpt,
      href,
      type: 'tutorial',
      meta: `${guide.readTime} · ${guide.difficulty}`,
      titleLower: guide.title.toLowerCase(),
      blob: text.toLowerCase(),
    })
  }

  for (const comparison of comparisons) {
    if (isNoindexComparisonSlug(comparison.slug)) continue

    const text = [
      comparison.title,
      comparison.slug,
      comparison.excerpt,
      comparison.productA,
      comparison.productB,
      comparison.category,
      comparison.verdict,
      ...(comparison.tags ?? []),
    ].join(' ')
    items.push({
      title: comparison.title,
      excerpt: comparison.excerpt,
      href: `/comparisons/${comparison.slug}`,
      type: 'comparison',
      meta: `${comparison.readTime} · ${comparison.productA} vs ${comparison.productB}`,
      titleLower: comparison.title.toLowerCase(),
      blob: text.toLowerCase(),
    })
  }

  for (const article of troubleshootingArticles) {
    if (isNoindexTroubleshootingSlug(article.slug)) continue

    const text = [
      article.title,
      article.slug,
      article.excerpt,
      article.category,
      ...article.affectedProducts,
    ].join(' ')
    items.push({
      title: article.title,
      excerpt: article.excerpt,
      href: `/troubleshooting/${article.slug}`,
      type: 'troubleshooting',
      meta: `${article.readTime} · ${article.difficulty}`,
      titleLower: article.title.toLowerCase(),
      blob: text.toLowerCase(),
    })
  }

  for (const topic of topics) {
    const text = [topic.name, topic.description].join(' ')
    items.push({
      title: topic.name,
      excerpt: topic.description,
      href: `/${topic.slug}`,
      type: 'topic',
      titleLower: topic.name.toLowerCase(),
      blob: text.toLowerCase(),
    })
  }

  return items
}

// Built once at module load — all source data is static.
const INDEX: IndexItem[] = buildIndex()

function scoreItem(item: IndexItem, terms: string[], phrase: string): number {
  let score = 0

  if (phrase.length > 2 && item.titleLower.includes(phrase)) score += 8
  if (phrase.length > 2 && item.blob.includes(phrase)) score += 3

  for (const term of terms) {
    if (item.titleLower.includes(term)) score += 4
    if (item.blob.includes(term)) score += 1
  }

  return score
}

export function search(query: string, limit = 30): SearchResult[] {
  const raw = query.trim().toLowerCase()
  if (raw.length < 2) return []

  const terms = raw.split(/\s+/).filter((term) => term.length >= 2)
  if (terms.length === 0) return []

  const phrase = terms.join(' ')

  return INDEX.map((item) => ({ item, score: scoreItem(item, terms, phrase) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => ({
      title: item.title,
      excerpt: item.excerpt,
      href: item.href,
      type: item.type,
      meta: item.meta,
    }))
}
