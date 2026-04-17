import { liveSignals } from '@/data/signals'
import { guides } from '@/data/guides'
import { scripts } from '@/data/scripts'

export const dynamic = 'force-static'

const BASE = 'https://www.adminsignal.com'
const FEED_URL = `${BASE}/rss.xml`
const SITE_TITLE = 'AdminSignal'
const SITE_DESCRIPTION =
  'Production-tested guides, PowerShell scripts, and analysis for enterprise sysadmins. Written by a practitioner with 12+ years managing Windows fleets and Intune tenants.'

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

  // News signals
  for (const s of liveSignals) {
    items.push({
      title: s.title,
      link: `${BASE}/news/${s.slug}`,
      description: s.excerpt,
      pubDate: s.publishedAt,
      category: s.category,
      guid: `${BASE}/news/${s.slug}`,
    })
  }

  // Tutorials / guides (MDX-backed)
  for (const g of guides) {
    const href = g.href ?? `/tutorials/${g.slug}`
    items.push({
      title: g.title,
      link: `${BASE}${href}`,
      description: g.excerpt,
      pubDate: g.publishedAt,
      category: g.category,
      guid: `${BASE}${href}`,
    })
  }

  // Scripts — no publishedAt on the Script type, use a stable fallback so
  // they appear at the bottom of a sorted feed without claiming a false date.
  for (const sc of scripts) {
    items.push({
      title: `Script: ${sc.title}`,
      link: `${BASE}/scripts/${sc.slug}`,
      description: sc.description,
      pubDate: '2026-01-01',
      category: sc.language,
      guid: `${BASE}/scripts/${sc.slug}`,
    })
  }

  // Sort newest-first
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
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <managingEditor>jack@adminsignal.com (Jack)</managingEditor>
    <webMaster>jack@adminsignal.com (Jack)</webMaster>
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
      // Cache for 1 hour on CDN edge; revalidate in background
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
