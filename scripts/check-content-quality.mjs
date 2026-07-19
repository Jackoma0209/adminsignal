import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const root = process.cwd()
const contentRoot = path.join(root, 'src', 'content')
const threshold = Number.parseInt(process.env.EDITORIAL_QUALITY_THRESHOLD ?? '60', 10)
const strictThreshold = process.env.QUALITY_STRICT === 'true'
const today = new Date()

const nonIndexableTypes = new Set(['reviews', 'scripts'])
const staticRoutes = new Set([
  '/',
  '/about',
  '/advertise',
  '/affiliate-disclosure',
  '/best-tools',
  '/comparisons',
  '/contact',
  '/cookies',
  '/editorial-policy',
  '/endpoint-security',
  '/group-policy',
  '/intune',
  '/microsoft-365',
  '/microsoft-entra-id',
  '/news',
  '/patch-management',
  '/powershell',
  '/privacy',
  '/reviews',
  '/sccm-mecm',
  '/scripts',
  '/search',
  '/terms',
  '/topics',
  '/troubleshooting',
  '/tutorials',
  '/windows-server',
])

const officialSourceHosts = [
  'learn.microsoft.com',
  'support.microsoft.com',
  'www.microsoft.com',
  'techcommunity.microsoft.com',
  'msrc.microsoft.com',
  'cisa.gov',
  'www.cisa.gov',
  'nvd.nist.gov',
  'support.google.com',
  'developers.google.com',
]

const placeholderPatterns = [
  /\blorem ipsum\b/i,
  /\bTODO\b/,
  /\bTBC\b/,
  /\bplaceholder(?: text)?\b/i,
  /full script download coming soon/i,
  /complete script coming soon/i,
  /replace this (?:text|content)/i,
]

const errors = []
const warnings = []

function walk(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(fullPath)
    return entry.isFile() && /\.mdx?$/.test(entry.name) ? [fullPath] : []
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

function extractMarkdownLinks(body) {
  return [...body.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)].map((match) => match[1].trim())
}

function extractDraftNewsSlugs() {
  const source = read(path.join(root, 'src', 'lib', 'noindex.ts'))
  const block = source.match(/DRAFT_NEWS_SLUGS\s*=\s*new Set\(\[([\s\S]*?)\]\)/)?.[1] ?? ''
  return new Set([...block.matchAll(/['"]([^'"]+)['"]/g)].map((match) => match[1]))
}

const draftNewsSlugs = extractDraftNewsSlugs()
const files = walk(contentRoot)
const records = files.map((file) => {
  const source = read(file)
  const parsed = matter(source)
  const type = path.basename(path.dirname(file))
  const slug = path.basename(file).replace(/\.mdx?$/, '')
  const route = `/${type}/${slug}`
  const isIndexable = !nonIndexableTypes.has(type) && !(type === 'news' && draftNewsSlugs.has(slug))
  return {
    file,
    relative: relative(file),
    source,
    body: parsed.content,
    data: parsed.data,
    type,
    slug,
    route,
    isIndexable,
  }
})

const knownRoutes = new Set([...staticRoutes, ...records.map((record) => record.route)])
const titleOwners = new Map()
const descriptionOwners = new Map()

function addDuplicate(map, value, record, label) {
  if (!value) return
  const normalized = String(value).trim().toLowerCase()
  const previous = map.get(normalized)
  if (previous) {
    errors.push(`${label} duplicated by ${previous} and ${record.relative}`)
  } else {
    map.set(normalized, record.relative)
  }
}

function countMatches(body, pattern) {
  return [...body.matchAll(pattern)].length
}

function containsAny(body, terms) {
  const normalized = body.toLowerCase()
  return terms.some((term) => normalized.includes(term))
}

function clamp(value) {
  return Math.max(0, Math.min(10, Math.round(value)))
}

function scoreRecord(record) {
  const { body, data, type } = record
  const words = body.trim().split(/\s+/).filter(Boolean).length
  const h2Count = countMatches(body, /^##\s+/gm)
  const h1Count = countMatches(body, /^#\s+/gm)
  const codeBlocks = Math.floor(countMatches(body, /^```/gm) / 2)
  const tables = countMatches(body, /^\|.+\|$/gm)
  const checkboxes = countMatches(body, /^\s*[-*]\s+\[[ xX]\]/gm)
  const orderedSteps = countMatches(body, /^\s*\d+\.\s+/gm)
  const links = extractMarkdownLinks(body)
  const officialSources = links.filter((link) => {
    try {
      return officialSourceHosts.includes(new URL(link).hostname)
    } catch {
      return false
    }
  }).length

  const originalContribution = clamp(
    3 +
      (containsAny(body, ['decision', 'trade-off', 'failure state', 'root cause']) ? 2 : 0) +
      (containsAny(body, ['when not to', 'do not use', 'not suitable']) ? 2 : 0) +
      (containsAny(body, ['rollback', 'blast radius', 'pilot']) ? 2 : 0) +
      (words >= 1200 ? 1 : 0),
  )

  const practicalUsefulness = clamp(
    2 + Math.min(codeBlocks, 3) + (tables > 0 ? 2 : 0) + (checkboxes > 0 ? 2 : 0) + (orderedSteps > 2 ? 1 : 0),
  )

  const completeness = clamp(
    2 + Math.min(h2Count, 5) + (words >= 900 ? 1 : 0) + (words >= 1600 ? 1 : 0) + (h1Count === 0 ? 1 : 0),
  )

  const accuracy = clamp(2 + Math.min(officialSources * 2, 6) + (links.length > officialSources ? 1 : 0))
  const authorCredibility = clamp(data.authorId ? 8 : 2)
  const transparency = clamp(
    2 +
      (containsAny(body, ['scope', 'prerequisite', 'assumes']) ? 3 : 0) +
      (containsAny(body, ['limitation', 'caveat', 'example environment']) ? 3 : 0) +
      (containsAny(body, ['expected output', 'validation']) ? 2 : 0),
  )

  const published = parseDate(data.publishedAt ?? data.date)
  const modified = parseDate(data.lastReviewed ?? data.updatedAt ?? data.dateModified)
  let freshness = 5
  if (published && published <= today) freshness += 2
  if (modified && (!published || modified >= published) && modified <= today) freshness += 2
  if (published && today.valueOf() - published.valueOf() < 1000 * 60 * 60 * 24 * 730) freshness += 1
  freshness = clamp(freshness)

  const userExperience = clamp(4 + Math.min(h2Count, 4) + (h1Count === 0 ? 2 : -3))
  const commercialIntent = clamp(
    type === 'reviews'
      ? 3
      : type === 'comparisons'
        ? containsAny(body, ['affiliate', 'sponsored', 'commission'])
          ? 5
          : 7
        : 10,
  )
  const duplication = 10

  const dimensions = {
    originalContribution,
    practicalUsefulness,
    completeness,
    accuracy,
    authorCredibility,
    transparency,
    freshness,
    userExperience,
    commercialIntent,
    duplication,
  }

  return {
    score: Object.values(dimensions).reduce((sum, value) => sum + value, 0),
    dimensions,
    words,
    h2Count,
    codeBlocks,
    officialSources,
  }
}

for (const record of records) {
  const { body, data, relative: file, route, isIndexable } = record
  const published = parseDate(data.publishedAt ?? data.date)
  const modified = parseDate(data.lastReviewed ?? data.updatedAt ?? data.dateModified)
  const h1Count = countMatches(body, /^#\s+/gm)

  addDuplicate(titleOwners, data.metaTitle ?? data.title, record, 'Title')
  addDuplicate(descriptionOwners, data.metaDescription ?? data.description ?? data.excerpt, record, 'Description')

  if (isIndexable && !data.title) errors.push(`${file}: indexable article is missing a title`)
  if (isIndexable && !data.authorId) errors.push(`${file}: indexable article is missing authorId`)
  if (published && published > today) errors.push(`${file}: publication date is in the future`)
  if (modified && modified > today) errors.push(`${file}: modified/reviewed date is in the future`)
  if (published && modified && modified < published) {
    errors.push(`${file}: modified/reviewed date is earlier than publication date`)
  }
  if (h1Count > 0) errors.push(`${file}: MDX contains ${h1Count} H1 heading(s); the page template already supplies the H1`)

  for (const pattern of placeholderPatterns) {
    if (pattern.test(body)) errors.push(`${file}: placeholder or unfinished-copy pattern matched ${pattern}`)
  }

  for (const link of extractMarkdownLinks(body)) {
    const clean = link.split('#')[0].split('?')[0]
    if (!clean.startsWith('/') || clean.startsWith('//') || clean === '') continue
    if (clean.startsWith('/images/') || clean.startsWith('/api/')) continue
    if (!knownRoutes.has(clean)) warnings.push(`${file}: internal link target not found in static inventory: ${clean}`)
  }

  if (isIndexable) {
    const result = scoreRecord(record)
    record.quality = result
    if (result.score < threshold) {
      const message = `${file}: editorial quality score ${result.score}/100 is below threshold ${threshold}`
      if (strictThreshold) errors.push(message)
      else warnings.push(message)
    }
    if (result.officialSources === 0) warnings.push(`${file}: no recognised primary-source link found`)
    if (result.h2Count < 2) warnings.push(`${file}: fewer than two H2 sections`)
  }
}

const noindexSource = read(path.join(root, 'src', 'lib', 'noindex.ts'))
const sitemapSource = read(path.join(root, 'src', 'app', 'sitemap.ts'))
const authorsSource = read(path.join(root, 'src', 'data', 'authors.ts'))
const reviewsSource = read(path.join(root, 'src', 'data', 'reviews.ts'))
const reviewPageSource = read(path.join(root, 'src', 'app', 'reviews', '[slug]', 'page.tsx'))
const scriptPageSource = read(path.join(root, 'src', 'app', 'scripts', '[slug]', 'page.tsx'))
const homepageSource = read(path.join(root, 'src', 'app', 'page.tsx'))

for (const required of ["'/scripts'", "'/reviews'"]) {
  if (!noindexSource.includes(required)) errors.push(`src/lib/noindex.ts: missing ${required} noindex rule`)
}

if (/\$\{BASE\}\/scripts|\$\{BASE\}\/reviews/.test(sitemapSource)) {
  errors.push('src/app/sitemap.ts: unfinished scripts or evaluation archive included in sitemap')
}

if (/\brating\s*:|ratingValue|reviewSchema\s*\(/.test(reviewsSource + reviewPageSource)) {
  errors.push('Product evaluation pages still contain numerical ratings or Review schema')
}

if (/softwareSourceCodeSchema/.test(scriptPageSource)) {
  errors.push('Incomplete script page still emits SoftwareSourceCode schema')
}

for (const unsupportedClaim of [
  /Microsoft Certified:/i,
  /senior enterprise sysadmin/i,
  /more than\s+\d+\s+years/i,
  /real deployments/i,
]) {
  if (unsupportedClaim.test(authorsSource)) {
    errors.push(`src/data/authors.ts: unsupported author claim matched ${unsupportedClaim}`)
  }
}

if (/Last site-wide review|toLocaleDateString\([^)]*month/.test(homepageSource)) {
  errors.push('src/app/page.tsx: automatic site-wide review date detected')
}

const scored = records
  .filter((record) => record.isIndexable && record.quality)
  .sort((a, b) => a.quality.score - b.quality.score)

console.log(`Content inventory: ${records.length} MDX files; ${scored.length} treated as indexable.`)
console.log(`Editorial threshold: ${threshold}/100${strictThreshold ? ' (strict)' : ' (warning only)'}.`)
console.log('\nLowest-scoring indexable articles:')
for (const record of scored.slice(0, 15)) {
  const { score, words, h2Count, codeBlocks, officialSources } = record.quality
  console.log(
    `${String(score).padStart(3)}  ${record.route}  words=${words} h2=${h2Count} code=${codeBlocks} primarySources=${officialSources}`,
  )
}

if (warnings.length > 0) {
  console.warn(`\nWarnings (${warnings.length}):`)
  for (const warning of warnings) console.warn(`- ${warning}`)
}

if (errors.length > 0) {
  console.error(`\nContent quality check failed (${errors.length} error${errors.length === 1 ? '' : 's'}):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('\nContent quality and indexation checks passed.')
