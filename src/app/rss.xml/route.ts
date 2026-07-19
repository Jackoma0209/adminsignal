import { liveSignals } from '@/data/signals'
import { guides } from '@/data/guides'
import { isNoindexHref, isNoindexNewsSlug } from '@/lib/noindex'

export const dynamic = 'force-static'

const BASE = 'https://www.adminsignal.com'
const FEED_URL = `${BASE}/rss.xml`
const SITE_TITLE = 'AdminSignal'
const SITE_DESCRIPTION =
  'Source-backed guides and analysis for endpoint specialists, Windows administrators, Microsoft Intune administrators, PowerShell users, and enterprise IT engineers.'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toRfc822(dateStr: string): string {
  return new Date(dateStr).toUTCString()
}

interface FeedItem {
  title: string
  link: string
  description: string
  pubDate: string
  category: string
  guid: string
}

function buildItems(): FeedItem[] {
  const items: FeedItem[] = []

  for (const signal of liveSignals.filter((item) => !isNoindexNewsSlug(item.slug))) {
    items.push({
      title: signal.title,
      link: `${BASE}/news/${signal.slug}`,
      description: signal.excerpt,
      pubDate: signal.publishedAt,
      category: signal.category,
      guid: `${BASE}/news/${signal.slug}`,
    })
  }

  for (const guide of guides) {
    const href = guide.href ?? `/tutorials/${guide.slug}`
    if (isNoindexHref(href)) continue

    items.push({
      title: guide.title,
      link: `${BASE}${href}`,
      description: guide.excerpt,
      pubDate: guide.publishedAt,
      category: guide.category,
      guid: `${BASE}${href}`,
    })
  }

  items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
  return items
}

export function GET() {
  const items = buildItems()
  const lastBuildDate = items[0] ? toRfc822(items[0].pubDate) : new Date().toUTCString()

  const itemsXml = items
    .map(
      (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${toRfc822(item.pubDate)}</pubDate>
      <category>${escapeXml(item.category)}</category>
      <guid isPermaLink="true">${escapeXml(item.guid)}</guid>
    </item>`,
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${BASE}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-gb</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <image>
      <url>${BASE}/og-default.png</url>
      <title>${escapeXml(SITE_TITLE)}</title>
      <link>${BASE}</link>
    </image>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
