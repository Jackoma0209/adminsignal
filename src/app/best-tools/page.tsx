import { notFound } from 'next/navigation'

/**
 * Withdrawn from the public surface. A 200 unfinished archive is still a
 * low-value screen for an AdSense crawler.
 */
export default function WithdrawnArchivePage() {
  notFound()
}
