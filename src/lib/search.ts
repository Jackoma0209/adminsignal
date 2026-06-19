import { signals } from '@/data/signals'
import { guides } from '@/data/guides'
import { scripts } from '@/data/scripts'
import { comparisons } from '@/data/comparisons'
import { topics } from '@/data/topics'
import { troubleshootingArticles } from '@/data/troubleshooting'
import {
  isNoindexComparisonSlug,
  isNoindexNewsSlug,
  isNoindexTroubleshootingSlug,
  isNoindexTutorialSlug,
} from '@/lib/noindex'

export type ContentType =
  | 'news'
  | 'tutorial'
  | 'script'
  | 'review'
  | 'comparison'
  | 'troubleshooting'
  | 'topic'

export const TYPE_LABELS: Record<ContentType, string> = {
  news: 'News',
  tutorial: 'Tutorial',
  script: 'Script',
  review: 'Review',
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

  for (const s of signals) {
    if (isNoindexNewsSlug(s.slug)) continue

    const text = [s.title, s.slug, s.excerpt, s.category, s.source ?? '', ...(s.tags ?? [])].join(' ')
    items.push({
      title: s.title,
      excerpt: s.excerpt,
      href: `/news/${s.slug}`,
      type: 'news',
      meta: s.date,
      titleLower: s.title.toLowerCase(),
      blob: text.toLowerCase(),
    })
  }

  for (const g of guides) {
    if (isNoindexTutorialSlug(g.slug)) continue

    const text = [g.title, g.slug, g.excerpt, g.category, ...(g.tags ?? [])].join(' ')
    items.push({
      title: g.title,
      excerpt: g.excerpt,
      href: g.href ?? `/tutorials/${g.slug}`,
      type: 'tutorial',
      meta: `${g.readTime} · ${g.difficulty}`,
      titleLower: g.title.toLowerCase(),
      blob: text.toLowerCase(),
    })
  }

  for (const s of scripts) {
    const text = [s.title, s.slug, s.description, s.language, ...s.tags].join(' ')
    items.push({
      title: s.title,
      excerpt: s.description,
      href: `/scripts/${s.slug}`,
      type: 'script',
      meta: s.language,
      titleLower: s.title.toLowerCase(),
      blob: text.toLowerCase(),
    })
  }

  for (const c of comparisons) {
    if (isNoindexComparisonSlug(c.slug)) continue

    const text = [
      c.title,
      c.slug,
      c.excerpt,
      c.productA,
      c.productB,
      c.category,
      c.verdict,
      ...(c.tags ?? []),
    ].join(' ')
    items.push({
      title: c.title,
      excerpt: c.excerpt,
      href: `/comparisons/${c.slug}`,
      type: 'comparison',
      meta: `${c.readTime} · ${c.productA} vs ${c.productB}`,
      titleLower: c.title.toLowerCase(),
      blob: text.toLowerCase(),
    })
  }

  for (const a of troubleshootingArticles) {
    if (isNoindexTroubleshootingSlug(a.slug)) continue

    const text = [a.title, a.slug, a.excerpt, a.category, ...a.affectedProducts].join(' ')
    items.push({
      title: a.title,
      excerpt: a.excerpt,
      href: `/troubleshooting/${a.slug}`,
      type: 'troubleshooting',
      meta: `${a.readTime} · ${a.difficulty}`,
      titleLower: a.title.toLowerCase(),
      blob: text.toLowerCase(),
    })
  }

  for (const t of topics) {
    const text = [t.name, t.description].join(' ')
    items.push({
      title: t.name,
      excerpt: t.description,
      href: `/${t.slug}`,
      type: 'topic',
      titleLower: t.name.toLowerCase(),
      blob: text.toLowerCase(),
    })
  }

  return items
}

// Built once at module load — all source data is static
const INDEX: IndexItem[] = buildIndex()

function scoreItem(item: IndexItem, terms: string[], phrase: string): number {
  let score = 0

  // Exact phrase bonus (highest weight)
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

  // Filter stop words below 2 chars
  const terms = raw.split(/\s+/).filter((t) => t.length >= 2)
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
