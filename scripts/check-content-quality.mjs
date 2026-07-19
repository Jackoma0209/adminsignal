import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const root = process.cwd()
const contentRoot = path.join(root, 'src', 'content')
const threshold = Number.parseInt(process.env.EDITORIAL_QUALITY_THRESHOLD ?? '60', 10)
const strictThreshold = process.env.QUALITY_STRICT === 'true'
const now = new Date()
const errors = []
const warnings = []

const nonIndexableTypes = new Set(['reviews', 'scripts'])
const knownStaticRoutes = new Set([
  '/', '/about', '/advertise', '/affiliate-disclosure', '/best-tools', '/comparisons',
  '/contact', '/cookies', '/editorial-policy', '/endpoint-security', '/group-policy',
  '/intune', '/microsoft-365', '/microsoft-entra-id', '/news', '/patch-management',
  '/powershell', '/privacy', '/reviews', '/sccm-mecm', '/scripts', '/search', '/terms',
  '/topics', '/troubleshooting', '/tutorials', '/windows-server',
])
const primarySourceHosts = new Set([
  'learn.microsoft.com', 'support.microsoft.com', 'www.microsoft.com',
  'techcommunity.microsoft.com', 'msrc.microsoft.com', 'cisa.gov', 'www.cisa.gov',
  'nvd.nist.gov', 'support.google.com', 'developers.google.com',
  'helpcenter.veeam.com', 'nmehelp.getnerdio.com', 'developer.crowdstrike.com',
])
const unfinishedPatterns = [
  /\blorem ipsum\b/i,
  /\bTODO\b/,
  /\bTBC\b/,
  /full script download coming soon/i,
  /complete script coming soon/i,
  /replace this (?:text|content)/i,
]

function walk(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return entry.isFile() && /\.mdx?$/.test(entry.name) ? [full] : []
  })
}

function read(file) {
  return readFileSync(file, 'utf8')
}

function relative(file) {
  return path.relative(root, file).replaceAll(path.sep, '/')
}

function parseDate(value) {
  if (!value) return undefined
  const date = new Date(String(value))
  return Number.isNaN(date.valueOf()) ? undefined : date
}

function markdownLinks(body) {
  return [...body.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)].map((match) => match[1].trim())
}

function extractDraftNewsSlugs() {
  const source = read(path.join(root, 'src', 'lib', 'noindex.ts'))
  const block = source.match(/DRAFT_NEWS_SLUGS\s*=\s*new Set\(\[([\s\S]*?)\]\)/)?.[1] ?? ''
  return new Set([...block.matchAll(/['"]([^'"]+)['"]/g)].map((match) => match[1]))
}

function contains(body, terms) {
  const text = body.toLowerCase()
  return terms.some((term) => text.includes(term))
}

function count(body, pattern) {
  return [...body.matchAll(pattern)].length
}

function clamp(value) {
  return Math.max(0, Math.min(10, Math.round(value)))
}

function qualityScore(record) {
  const { body, data, type } = record
  const words = body.trim().split(/\s+/).filter(Boolean).length
  const h2 = count(body, /^##\s+/gm)
  const codeBlocks = Math.floor(count(body, /^```/gm) / 2)
  const tables = count(body, /^\|.+\|$/gm)
  const checklists = count(body, /^\s*[-*]\s+\[[ xX]\]/gm)
  const orderedSteps = count(body, /^\s*\d+\.\s+/gm)
  const links = markdownLinks(body)
  const primarySources = links.filter((link) => {
    try {
      return primarySourceHosts.has(new URL(link).hostname)
    } catch {
      return false
    }
  }).length

  const dimensions = {
    originalContribution: clamp(
      3 +
        (contains(body, ['decision', 'trade-off', 'failure state', 'root cause']) ? 2 : 0) +
        (contains(body, ['when not to', 'do not use', 'not suitable']) ? 2 : 0) +
        (contains(body, ['rollback', 'blast radius', 'pilot']) ? 2 : 0) +
        (words >= 1200 ? 1 : 0),
    ),
    practicalUsefulness: clamp(
      2 + Math.min(codeBlocks, 3) + (tables > 0 ? 2 : 0) +
        (checklists > 0 ? 2 : 0) + (orderedSteps > 2 ? 1 : 0),
    ),
    completeness: clamp(2 + Math.min(h2, 5) + (words >= 900 ? 1 : 0) + (words >= 1600 ? 1 : 0)),
    accuracy: clamp(2 + Math.min(primarySources * 2, 7)),
    authorCredibility: clamp(data.authorId ? 8 : 2),
    transparency: clamp(
      2 + (contains(body, ['scope', 'prerequisite', 'assumes']) ? 3 : 0) +
        (contains(body, ['limitation', 'caveat', 'example environment']) ? 3 : 0) +
        (contains(body, ['expected output', 'validation']) ? 2 : 0),
    ),
    freshness: clamp((parseDate(data.date ?? data.publishedAt) ? 7 : 4) + (parseDate(data.lastReviewed ?? data.updatedAt) ? 2 : 0)),
    userExperience: clamp(4 + Math.min(h2, 4) + (count(body, /^#\s+/gm) === 0 ? 2 : -3)),
    commercialIntent: type === 'reviews' ? 3 : type === 'comparisons' ? 7 : 10,
    duplication: 10,
  }

  return {
    score: Object.values(dimensions).reduce((sum, value) => sum + value, 0),
    dimensions,
    words,
    h2,
    codeBlocks,
    primarySources,
  }
}

const draftNews = extractDraftNewsSlugs()
const records = walk(contentRoot).map((file) => {
  const source = read(file)
  const parsed = matter(source)
  const type = path.basename(path.dirname(file))
  const slug = path.basename(file).replace(/\.mdx?$/, '')
  return {
    file,
    relative: relative(file),
    body: parsed.content,
    data: parsed.data,
    type,
    slug,
    route: `/${type}/${slug}`,
    indexable: !nonIndexableTypes.has(type) && !(type === 'news' && draftNews.has(slug)),
  }
})
const knownRoutes = new Set([...knownStaticRoutes, ...records.map((record) => record.route)])
const titles = new Map()
const descriptions = new Map()

function checkDuplicate(map, value, label, file) {
  if (!value) return
  const normalized = String(value).trim().toLowerCase()
  const first = map.get(normalized)
  if (first) errors.push(`${label} duplicated by ${first} and ${file}`)
  else map.set(normalized, file)
}

for (const record of records) {
  const { body, data, relative: file, indexable } = record
  const published = parseDate(data.publishedAt ?? data.date)
  const modified = parseDate(data.lastReviewed ?? data.updatedAt ?? data.dateModified)
  const h1 = count(body, /^#\s+/gm)

  if (indexable && !data.title) errors.push(`${file}: missing title`)
  if (indexable && !data.authorId) errors.push(`${file}: missing authorId`)
  if (published && published > now) errors.push(`${file}: future publication date`)
  if (modified && modified > now) errors.push(`${file}: future modified/reviewed date`)
  if (published && modified && modified < published) errors.push(`${file}: modified date precedes publication date`)
  if (h1 > 0) errors.push(`${file}: MDX contains ${h1} H1 heading(s); template already supplies H1`)

  for (const pattern of unfinishedPatterns) {
    if (pattern.test(body)) errors.push(`${file}: unfinished-copy pattern matched ${pattern}`)
  }

  if (indexable) {
    checkDuplicate(titles, data.metaTitle ?? data.title, 'Title', file)
    checkDuplicate(descriptions, data.metaDescription ?? data.description ?? data.excerpt, 'Description', file)

    const result = qualityScore(record)
    record.quality = result
    if (result.score < threshold) {
      const message = `${file}: quality score ${result.score}/100 below threshold ${threshold}`
      if (strictThreshold) errors.push(message)
      else warnings.push(message)
    }
    if (result.primarySources === 0) warnings.push(`${file}: no recognised primary-source link found`)
    if (result.h2 < 2) warnings.push(`${file}: fewer than two H2 sections`)
  }

  for (const link of markdownLinks(body)) {
    const clean = link.split('#')[0].split('?')[0]
    if (!clean.startsWith('/') || clean.startsWith('//') || clean === '') continue
    if (clean.startsWith('/images/') || clean.startsWith('/api/')) continue
    if (!knownRoutes.has(clean)) warnings.push(`${file}: internal target not found in source inventory: ${clean}`)
  }
}

const noindexSource = read(path.join(root, 'src', 'lib', 'noindex.ts'))
const sitemapSource = read(path.join(root, 'src', 'app', 'sitemap.ts'))
const authorsSource = read(path.join(root, 'src', 'data', 'authors.ts'))
const reviewsSource = read(path.join(root, 'src', 'data', 'reviews.ts'))
const reviewPageSource = read(path.join(root, 'src', 'app', 'reviews', '[slug]', 'page.tsx'))
const scriptPageSource = read(path.join(root, 'src', 'app', 'scripts', '[slug]', 'page.tsx'))
const homepageSource = read(path.join(root, 'src', 'app', 'page.tsx'))

for (const route of ["'/scripts'", "'/reviews'"]) {
  if (!noindexSource.includes(route)) errors.push(`src/lib/noindex.ts: missing ${route} rule`)
}
if (/\$\{BASE\}\/scripts|\$\{BASE\}\/reviews/.test(sitemapSource)) {
  errors.push('src/app/sitemap.ts: noindex archive included in sitemap')
}
if (/\brating\s*:|ratingValue|reviewSchema\s*\(/.test(reviewsSource + reviewPageSource)) {
  errors.push('Product evaluation pages contain a numerical rating or Review schema')
}
if (/softwareSourceCodeSchema/.test(scriptPageSource)) {
  errors.push('Incomplete script page emits SoftwareSourceCode schema')
}
for (const claim of [/Microsoft Certified:/i, /senior enterprise sysadmin/i, /more than\s+\d+\s+years/i, /real deployments/i]) {
  if (claim.test(authorsSource)) errors.push(`src/data/authors.ts: unsupported claim matched ${claim}`)
}
if (/Last site-wide review|toLocaleDateString\([^)]*month/.test(homepageSource)) {
  errors.push('src/app/page.tsx: automatic site-wide review date detected')
}

const scored = records.filter((record) => record.indexable && record.quality).sort((a, b) => a.quality.score - b.quality.score)
console.log(`Content inventory: ${records.length} MDX files; ${scored.length} indexable.`)
console.log(`Editorial threshold: ${threshold}/100${strictThreshold ? ' (strict)' : ' (warning only)'}.`)
console.log('\nLowest-scoring indexable articles:')
for (const record of scored.slice(0, 15)) {
  const { score, words, h2, codeBlocks, primarySources } = record.quality
  console.log(`${String(score).padStart(3)}  ${record.route}  words=${words} h2=${h2} code=${codeBlocks} primarySources=${primarySources}`)
}
if (warnings.length) {
  console.warn(`\nWarnings (${warnings.length}):`)
  for (const warning of warnings) console.warn(`- ${warning}`)
}
if (errors.length) {
  console.error(`\nContent quality check failed (${errors.length}):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}
console.log('\nContent quality and indexation checks passed.')
