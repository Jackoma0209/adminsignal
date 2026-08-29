import type { MetadataRoute } from 'next'

/**
 * Incomplete or low-value sections remain on the site for human readers and
 * internal links, but are kept out of search crawls until they meet the same
 * editorial standard as indexable guides.
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
