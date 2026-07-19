import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'

const baseUrl = (process.env.SITE_URL ?? 'http://127.0.0.1:3000').replace(/\/$/, '')
const productionUrl = 'https://www.adminsignal.com'
const errors = []
const warnings = []

function slugs(type) {
  const dir = path.join(process.cwd(), 'src', 'content', type)
  try {
    return readdirSync(dir)
      .filter((name) => name.endsWith('.mdx'))
      .map((name) => name.replace(/\.mdx$/, ''))
  } catch {
    return []
  }
}

function setSlugs(source, setName) {
  const escaped = setName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const block = source.match(
    new RegExp(`${escaped}\\s*=\\s*new Set(?:<[^>]+>)?\\(\\[([\\s\\S]*?)\\]\\)`),
  )?.[1] ?? ''
  return [...block.matchAll(/['"]([^'"]+)['"]/g)].map((match) => match[1])
}

async function get(pathname, options = {}) {
  const url = pathname.startsWith('http') ? pathname : `${baseUrl}${pathname}`
  const response = await fetch(url, { redirect: options.redirect ?? 'follow' })
  const body = await response.text()
  return { url, response, body }
}

function match(html, pattern) {
  return html.match(pattern)?.[1]?.trim()
}

function decode(value = '') {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
}

function robotsValue(html) {
  return match(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["'][^>]*>/i) ??
    match(html, /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["'][^>]*>/i)
}

function canonicalValue(html) {
  return match(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i) ??
    match(html, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["'][^>]*>/i)
}

function descriptionValue(html) {
  return match(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i) ??
    match(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i)
}

function titleValue(html) {
  return decode(match(html, /<title>([\s\S]*?)<\/title>/i))
}

function h1Count(html) {
  return (html.match(/<h1\b/gi) ?? []).length
}

function jsonLdCount(html) {
  return (html.match(/<script[^>]+type=["']application\/ld\+json["']/gi) ?? []).length
}

function parseJsonLd(html, pathname) {
  const blocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  for (const [, raw] of blocks) {
    try {
      JSON.parse(raw.replaceAll('&quot;', '"'))
    } catch (error) {
      errors.push(`${pathname}: invalid JSON-LD (${error.message})`)
    }
  }
}

function internalLinks(html) {
  return [...html.matchAll(/<a[^>]+href=["']([^"']+)["']/gi)]
    .map((linkMatch) => decode(linkMatch[1]))
    .filter((href) => href.startsWith('/') && !href.startsWith('//'))
    .map((href) => href.split('#')[0])
    .filter(Boolean)
}

function checkHiddenLinks(body, pathname, hiddenPaths) {
  const links = new Set(internalLinks(body).map((href) => href.split('?')[0]))
  for (const hiddenPath of hiddenPaths) {
    if (links.has(hiddenPath)) {
      errors.push(`${pathname}: promotes hidden or under-review route ${hiddenPath}`)
    }
  }
}

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const { response } = await get('/')
      if (response.ok) return
    } catch {
      // Server may still be starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 750))
  }
  throw new Error(`Server did not become ready at ${baseUrl}`)
}

const noindexSource = readFileSync(path.join(process.cwd(), 'src', 'lib', 'noindex.ts'), 'utf8')
const draftNewsPaths = setSlugs(noindexSource, 'DRAFT_NEWS_SLUGS').map((slug) => `/news/${slug}`)
const reviewNewsPaths = setSlugs(noindexSource, 'NOINDEX_NEWS_SLUGS').map((slug) => `/news/${slug}`)
const reviewTroubleshootingPaths = setSlugs(noindexSource, 'NOINDEX_TROUBLESHOOTING_SLUGS')
  .map((slug) => `/troubleshooting/${slug}`)
const reviewTutorialPaths = setSlugs(noindexSource, 'NOINDEX_TUTORIAL_SLUGS')
  .map((slug) => `/tutorials/${slug}`)
const reviewGuidePaths = setSlugs(noindexSource, 'NOINDEX_GUIDE_SLUGS')
  .map((slug) => `/guides/${slug}`)

const quarantinePaths = new Set([
  ...draftNewsPaths,
  ...reviewNewsPaths,
  ...reviewTroubleshootingPaths,
  ...reviewTutorialPaths,
  ...reviewGuidePaths,
])

const noindexPaths = [
  '/scripts',
  ...slugs('scripts').map((slug) => `/scripts/${slug}`),
  '/reviews',
  ...slugs('reviews').map((slug) => `/reviews/${slug}`),
  '/best-tools',
  '/search?q=intune',
  ...quarantinePaths,
]

const hiddenFromDiscoveryPaths = new Set([
  '/scripts',
  ...slugs('scripts').map((slug) => `/scripts/${slug}`),
  '/reviews',
  ...slugs('reviews').map((slug) => `/reviews/${slug}`),
  ...quarantinePaths,
])

await waitForServer()

const sitemapResult = await get('/sitemap.xml')
if (sitemapResult.response.status !== 200) errors.push(`/sitemap.xml: expected 200, received ${sitemapResult.response.status}`)
const sitemapUrls = [...sitemapResult.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((urlMatch) => decode(urlMatch[1]))
const sitemapPaths = new Set(sitemapUrls.map((url) => new URL(url).pathname))
if (sitemapUrls.length === 0) errors.push('/sitemap.xml: no URLs found')

const titles = new Map()
const descriptions = new Map()
const discoveredLinks = new Set()

for (const url of sitemapUrls) {
  const pathname = new URL(url).pathname
  const { response, body } = await get(pathname)
  if (response.status !== 200) {
    errors.push(`${pathname}: sitemap URL returned ${response.status}`)
    continue
  }

  const title = titleValue(body)
  const description = decode(descriptionValue(body))
  const canonical = canonicalValue(body)
  const robots = robotsValue(body)?.toLowerCase() ?? ''
  const h1 = h1Count(body)

  if (!title) errors.push(`${pathname}: missing title`)
  if (!description) errors.push(`${pathname}: missing meta description`)
  if (!canonical) errors.push(`${pathname}: missing canonical`)
  else if (new URL(canonical, baseUrl).pathname !== pathname) {
    errors.push(`${pathname}: canonical points to ${canonical}`)
  }
  if (robots.includes('noindex')) errors.push(`${pathname}: sitemap URL is noindex`)
  if (h1 !== 1) errors.push(`${pathname}: expected one H1, found ${h1}`)
  if (/href=["']\/#newsletter["']/i.test(body)) {
    errors.push(`${pathname}: links to a missing newsletter anchor`)
  }

  if (title) {
    const owner = titles.get(title)
    if (owner) errors.push(`${pathname}: duplicate title also used by ${owner}`)
    else titles.set(title, pathname)
  }
  if (description) {
    const owner = descriptions.get(description)
    if (owner) errors.push(`${pathname}: duplicate description also used by ${owner}`)
    else descriptions.set(description, pathname)
  }

  parseJsonLd(body, pathname)
  for (const href of internalLinks(body)) discoveredLinks.add(href)
}

for (const pathname of noindexPaths) {
  const cleanPath = pathname.split('?')[0]
  const { response, body } = await get(pathname)
  if (response.status !== 200) {
    errors.push(`${pathname}: expected accessible noindex page with 200, received ${response.status}`)
    continue
  }
  const robots = robotsValue(body)?.toLowerCase() ?? ''
  if (!robots.includes('noindex')) errors.push(`${pathname}: expected noindex robots directive`)
  if (sitemapPaths.has(cleanPath)) errors.push(`${pathname}: noindex route appears in sitemap`)
  if (h1Count(body) !== 1) errors.push(`${pathname}: expected one H1`)
  parseJsonLd(body, pathname)

  if (quarantinePaths.has(cleanPath)) {
    if (!body.includes('Editorial review in progress')) {
      errors.push(`${pathname}: quarantined route is missing the editorial-review warning`)
    }
    if (jsonLdCount(body) > 0) {
      errors.push(`${pathname}: quarantined route must not emit JSON-LD`)
    }
  }
}

const discoveryPages = [
  '/', '/news', '/tutorials', '/troubleshooting', '/comparisons', '/topics',
  '/intune', '/powershell', '/windows-server', '/endpoint-security',
  '/microsoft-365', '/microsoft-entra-id', '/patch-management', '/group-policy',
  '/sccm-mecm',
]
for (const pathname of discoveryPages) {
  const { response, body } = await get(pathname)
  if (response.status !== 200) {
    errors.push(`${pathname}: discovery page returned ${response.status}`)
    continue
  }
  checkHiddenLinks(body, pathname, hiddenFromDiscoveryPaths)
  if (/href=["']\/#newsletter["']/i.test(body)) {
    errors.push(`${pathname}: links to a missing newsletter anchor`)
  }
}

const ads = await get('/ads.txt')
const expectedAds = 'google.com, pub-5563142788194204, DIRECT, f08c47fec0942fa0'
if (ads.response.status !== 200) errors.push(`/ads.txt: expected 200, received ${ads.response.status}`)
if (ads.body.trim() !== expectedAds) errors.push(`/ads.txt: expected exactly ${expectedAds}`)
if (!(ads.response.headers.get('content-type') ?? '').startsWith('text/plain')) errors.push('/ads.txt: content-type is not text/plain')

const robots = await get('/robots.txt')
if (robots.response.status !== 200) errors.push(`/robots.txt: expected 200, received ${robots.response.status}`)
if (!robots.body.includes('Sitemap: https://www.adminsignal.com/sitemap.xml')) errors.push('/robots.txt: production sitemap declaration missing')

const rss = await get('/rss.xml')
if (rss.response.status !== 200) errors.push(`/rss.xml: expected 200, received ${rss.response.status}`)
if (!(rss.response.headers.get('content-type') ?? '').startsWith('application/rss+xml')) {
  errors.push('/rss.xml: content-type is not application/rss+xml')
}
const rssItemCount = (rss.body.match(/<item>/g) ?? []).length
if (rssItemCount === 0) errors.push('/rss.xml: no feed items found')
if (/12\+\s*years|managing Windows fleets and Intune tenants/i.test(rss.body)) {
  errors.push('/rss.xml: unsupported experience claim detected')
}
if (/<title>Script:/i.test(rss.body)) errors.push('/rss.xml: incomplete script item detected')
for (const hiddenPath of hiddenFromDiscoveryPaths) {
  if (rss.body.includes(`${productionUrl}${hiddenPath}`)) {
    errors.push(`/rss.xml: contains hidden or under-review route ${hiddenPath}`)
  }
}

const missingPath = '/this-route-must-not-exist-adsense-audit'
const missing = await get(missingPath)
if (missing.response.status !== 404) errors.push(`Unknown route: expected 404, received ${missing.response.status}`)
checkHiddenLinks(missing.body, missingPath, hiddenFromDiscoveryPaths)
if (/href=["']\/#newsletter["']/i.test(missing.body)) {
  errors.push(`${missingPath}: links to a missing newsletter anchor`)
}

const checkedLinks = new Set()
for (const href of [...discoveredLinks].slice(0, 500)) {
  const pathname = href.split('?')[0]
  if (!pathname || checkedLinks.has(pathname) || pathname.startsWith('/_next/')) continue
  checkedLinks.add(pathname)
  const { response } = await get(pathname)
  if (response.status >= 400) errors.push(`${pathname}: internal link returned ${response.status}`)
}

for (const pathname of ['/news', '/tutorials', '/troubleshooting', '/comparisons', '/topics']) {
  const { response, body } = await get(pathname)
  if (response.status !== 200) errors.push(`${pathname}: archive returned ${response.status}`)
  const articleCards = (body.match(/<article\b/gi) ?? []).length
  if (articleCards === 0) warnings.push(`${pathname}: no <article> cards detected; verify archive is not empty`)
}

console.log(
  `Rendered audit checked ${sitemapUrls.length} sitemap URLs, ${noindexPaths.length} noindex routes, ${discoveryPages.length} discovery pages, ${rssItemCount} RSS items, and ${checkedLinks.size} internal-link targets.`,
)
if (warnings.length) {
  console.warn(`Warnings (${warnings.length}):`)
  for (const warning of warnings) console.warn(`- ${warning}`)
}
if (errors.length) {
  console.error(`Rendered site audit failed (${errors.length}):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}
console.log('Rendered site audit passed.')
