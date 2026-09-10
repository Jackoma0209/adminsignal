import { chromium } from 'playwright-core'
import assert from 'node:assert/strict'
import { mkdirSync, readFileSync } from 'node:fs'

// Browser-only website checks. Never executes article commands or connects to a tenant.
const base = process.env.SITE_URL ?? 'http://127.0.0.1:3001'
const output = process.env.BROWSER_OUTPUT ?? '../../work/browser-results'
mkdirSync(output, { recursive: true })
const browser = await chromium.launch({
  executablePath: process.env.BROWSER_EXECUTABLE ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: true,
})
const results = []
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, permissions: ['clipboard-read', 'clipboard-write'] })
    const page = await context.newPage()
    if (process.env.PREVIEW_ACCESS_FILE) {
      const accessUrl = readFileSync(process.env.PREVIEW_ACCESS_FILE, 'utf8').trim()
      assert.equal(new URL(accessUrl).origin, new URL(base).origin)
      await page.goto(accessUrl, { waitUntil: 'networkidle' })
      if (process.env.PREVIEW_STATE_FILE) await context.storageState({ path: process.env.PREVIEW_STATE_FILE })
    }
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    for (const route of ['/', '/sccm-mecm', '/group-policy', '/about', '/templates', '/comparisons/intune-vs-sccm-mecm-2025', '/troubleshooting/intune-device-not-syncing']) {
      const response = await page.goto(base + route, { waitUntil: 'networkidle' })
      assert.equal(response.status(), 200, route)
      assert.equal(new URL(page.url()).origin, new URL(base).origin, 'Preview authentication required')
      assert.equal(await page.locator('h1').count(), 1, route + ' heading')
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), route + ' overflow at ' + width)
      await page.locator('footer').scrollIntoViewIfNeeded()
      const images = await page.locator('img').evaluateAll(images => images.filter(i => i.complete && i.naturalWidth === 0).map(i => i.src))
      assert.deepEqual(images, [], route + ' broken images')
      if (route === '/sccm-mecm') {
        await page.evaluate(() => window.scrollTo(0, 0))
        await page.screenshot({ path: `${output}/hub-${width}.png`, fullPage: true })
      }
      if (route === '/troubleshooting/intune-device-not-syncing') {
        const code = (await page.locator('pre').first().innerText()).trim()
        await page.getByRole('button', { name: 'Copy code to clipboard', exact: true }).first().click()
        await page.getByRole('button', { name: 'Copied to clipboard', exact: true }).waitFor()
        assert.equal((await page.evaluate(() => navigator.clipboard.readText())).trim(), code)
        await page.evaluate(() => window.scrollTo(0, 0))
        await page.screenshot({ path: `${output}/article-${width}.png`, fullPage: true })
      }
      if (route === '/templates') {
        const downloads = page.locator('a[download]')
        assert.equal(await downloads.count(), 2)
        for (let i = 0; i < 2; i++) {
          const link = downloads.nth(i)
          const href = await link.getAttribute('href')
          const pending = page.waitForEvent('download')
          await link.click()
          const download = await pending
          assert.equal(await download.failure(), null)
          assert.equal(readFileSync(await download.path(), 'utf8').replace(/\r\n/g, '\n'), readFileSync('public' + href, 'utf8').replace(/\r\n/g, '\n'))
        }
      }
      results.push(`${width}: ${route}`)
    }
    await page.goto(base)
    if (width < 1024) {
      await page.getByRole('button', { name: 'Toggle menu' }).click()
      const nav = page.getByRole('navigation', { name: 'Mobile navigation' })
      await nav.getByRole('link', { name: 'Tutorials', exact: true }).click()
      await page.waitForURL('**/tutorials')
      assert.equal(await nav.count(), 0)
    } else {
      await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Tutorials', exact: true }).click()
      await page.waitForURL('**/tutorials')
    }
    await page.locator('a[href*="?category="]').first().click()
    await page.waitForURL('**/tutorials?category=*')
    assert.ok(await page.locator('article').count() > 0)
    assert.match(await page.locator('meta[name="robots"]').getAttribute('content'), /noindex/)
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://www.adminsignal.com/tutorials')
    const missing = await page.goto(base + '/scripts')
    assert.equal(missing.status(), 404)
    assert.equal(await page.locator('ins.adsbygoogle, script[src*="pagead2.googlesyndication"]').count(), 0)
    await page.locator('main').getByRole('link', { name: 'Tutorials', exact: true }).click()
    await page.waitForURL('**/tutorials')
    await page.getByRole('button', { name: 'Privacy and cookie settings', exact: true }).click()
    await page.waitForURL('**/cookies', { timeout: 10000 })
    assert.deepEqual(errors, [], 'browser runtime errors')
    results.push(`${width}: navigation, filter, copy, downloads, 404 recovery, cookie fallback passed`)
    await context.close()
  }
  console.log(results.join('\n'))
} finally { await browser.close() }
