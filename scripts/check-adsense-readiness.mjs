import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const expectedSellerLine = 'google.com, pub-5563142788194204, DIRECT, f08c47fec0942fa0'
const expectedSellerId = 'pub-5563142788194204'
const expectedClientId = 'ca-pub-5563142788194204'
const ignoredDirs = new Set(['.git', '.next', 'node_modules', 'out'])
const routePath = path.join(root, 'src', 'app', 'ads.txt', 'route.ts')
const consentPath = path.join(root, 'src', 'lib', 'consent.ts')
const robotsPath = path.join(root, 'src', 'app', 'robots.ts')
const noindexPath = path.join(root, 'src', 'lib', 'noindex.ts')
const layoutPath = path.join(root, 'src', 'app', 'layout.tsx')
const legacyPublisherPattern = new RegExp(
  `${['NEXT_PUBLIC', 'ADSENSE', 'PUBLISHER_ID'].join('_')}|${['ADSENSE', 'PUBLISHER_ID'].join('_')}`
)
const requiredRobotsDisallows = ['/scripts', '/reviews', '/best-tools', '/search', '/api/']
const requiredNoindexPaths = ['/best-tools', '/reviews', '/scripts', '/search', '/advertise', '/templates']

function fail(message) {
  console.error(`AdSense readiness check failed: ${message}`)
  process.exitCode = 1
}

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (ignoredDirs.has(entry.name)) continue

    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...walk(fullPath))
    } else if (entry.isFile()) {
      files.push(fullPath)
    }
  }

  return files
}

function readText(file) {
  try {
    return readFileSync(file, 'utf8')
  } catch {
    return ''
  }
}

const files = walk(root)
const adsTxtFiles = files.filter((file) => path.basename(file).toLowerCase() === 'ads.txt')

if (!existsSync(routePath)) {
  fail('expected src/app/ads.txt/route.ts to serve /ads.txt')
}

for (const file of adsTxtFiles) {
  const relative = path.relative(root, file).replaceAll(path.sep, '/')
  const content = readText(file)

  if (relative === 'public/ads.txt') {
    fail('public/ads.txt exists and may conflict with the App Router /ads.txt handler')
  }

  if (/ca-pub-/i.test(content)) {
    fail(`${relative} contains a ca-pub client value; ads.txt must use the pub- seller ID`)
  }
}

if (adsTxtFiles.length > 0) {
  const names = adsTxtFiles.map((file) => path.relative(root, file).replaceAll(path.sep, '/'))
  fail(`unexpected static ads.txt file(s): ${names.join(', ')}`)
}

const routeSource = readText(routePath)
const consentSource = readText(consentPath)
const robotsSource = readText(robotsPath)
const noindexSource = readText(noindexPath)
const layoutSource = readText(layoutPath)

if (!routeSource.includes('ADSENSE_SELLER_PUBLISHER_ID')) {
  fail('ads.txt route does not use ADSENSE_SELLER_PUBLISHER_ID')
}

for (const disallow of requiredRobotsDisallows) {
  if (!robotsSource.includes(`'${disallow}'`) && !robotsSource.includes(`"${disallow}"`)) {
    fail(`robots.ts is missing disallow for ${disallow}`)
  }
}

for (const noindexPathValue of requiredNoindexPaths) {
  if (!noindexSource.includes(`'${noindexPathValue}'`) && !noindexSource.includes(`"${noindexPathValue}"`)) {
    fail(`noindex.ts is missing static path ${noindexPathValue}`)
  }
}

if (/\b12\+\s*years\b|\bmore than\s+\d+\s+years\b|\bno lab theory\b/i.test(layoutSource)) {
  fail('root layout metadata contains inflated experience claims that conflict with About page standards')
}

if (!routeSource.includes('text/plain')) {
  fail('ads.txt route should return text/plain')
}

if (!routeSource.includes('f08c47fec0942fa0')) {
  fail('ads.txt route is missing the Google seller authority ID')
}

if (!consentSource.includes(expectedSellerId)) {
  fail(`consent config is missing ${expectedSellerId}`)
}

if (!consentSource.includes(expectedClientId)) {
  fail(`consent config is missing ${expectedClientId}`)
}

if (consentSource.includes("NEXT_PUBLIC_ADSENSE_ENABLED === 'true'") === false) {
  fail('consent config must still gate adsenseScriptEnabled on NEXT_PUBLIC_ADSENSE_ENABLED')
}

if (consentSource.includes("NEXT_PUBLIC_ADS_ENABLED === 'true'") === false) {
  fail('consent config must still gate adsEnabled on NEXT_PUBLIC_ADS_ENABLED')
}

if (consentSource.includes("NEXT_PUBLIC_GA_ENABLED === 'true'") === false) {
  fail('consent config must still gate analyticsEnabled on NEXT_PUBLIC_GA_ENABLED')
}

for (const file of files) {
  if (statSync(file).size > 1_000_000) continue

  const relative = path.relative(root, file).replaceAll(path.sep, '/')
  const content = readText(file)

  if (/(ca-pub|pub)-0{3,}/i.test(content)) {
    fail(`${relative} contains a fake publisher placeholder ID`)
  }

  if (legacyPublisherPattern.test(content)) {
    fail(`${relative} references the legacy ambiguous AdSense publisher env/constant name`)
  }
}

if (process.exitCode) {
  process.exit()
}

console.log('AdSense readiness static check passed.')
console.log(`Expected /ads.txt: ${expectedSellerLine}`)
