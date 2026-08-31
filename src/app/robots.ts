import type { MetadataRoute } from 'next'

/**
 * Unfinished archives (/scripts, /reviews, /best-tools) and withdrawn guides
 * are 404 on the public surface. Keep them out of crawls as well.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/scripts',
        '/scripts/',
        '/reviews',
        '/reviews/',
        '/best-tools',
        '/best-tools/',
        '/search',
        '/api/',
        '/guides/windows-11-25h2-autopilot-v2',
        '/tutorials/windows-11-25h2-autopilot-v2',
        '/tutorials/autopilot-v2-enrollment-esp-troubleshooting',
        '/news/april-2026-patch-tuesday-breakdown',
        '/troubleshooting/april-2026-bitlocker-recovery-loop-kb5082063',
      ],
    },
    sitemap: 'https://www.adminsignal.com/sitemap.xml',
  }
}
