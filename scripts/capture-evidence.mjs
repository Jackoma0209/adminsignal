import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'evidence')
const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images', 'evidence')
mkdirSync(outDir, { recursive: true })

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'

const scenes = [
  'intune-configuration',
  'intune-defender-connector',
  'intune-autopilot-devices',
  'eac-smtp-auth-clients',
  'entra-emergency-users',
  'pwsh-legacy-inventory',
  'pwsh-ime-health',
  'cmd-dsregcmd',
]

const browser = await chromium.launch({
  executablePath: edge,
  headless: true,
})

const page = await browser.newPage({
  viewport: { width: 1400, height: 980 },
  deviceScaleFactor: 2,
})

for (const scene of scenes) {
  const html = path.join(root, `${scene}.html`)
  const png = path.join(outDir, `${scene}.png`)
  await page.goto(pathToFileURL(html).href, { waitUntil: 'networkidle' })
  const target = page.locator('.capture')
  await target.waitFor()
  await target.screenshot({ path: png, type: 'png' })
  console.log(`Wrote ${path.relative(process.cwd(), png)}`)
}

await browser.close()
