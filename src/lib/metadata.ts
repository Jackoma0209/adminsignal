import type { Metadata } from 'next'
import { toIsoDate } from './dates'

const siteUrl = 'https://www.adminsignal.com'
const siteName = 'AdminSignal'

// Default OG image — used whenever a page doesn't supply its own.
// Must be an absolute URL because individual page metadata overrides the root layout's openGraph object.
const DEFAULT_OG_IMAGE = {
  url: `${siteUrl}/og-default.png`,
  width: 1200,
  height: 630,
  alt: 'AdminSignal — Practitioner-Focused Guides for Enterprise Sysadmins',
}

export function buildArticleMetadata({
  title,
  absoluteTitle,
  description,
  url,
  category,
  publishedTime,
  modifiedTime,
  tags,
  metaKeywords = tags,
  authorName,
  ogImage,
  openGraphTitle,
  openGraphDescription,
}: {
  title: string
  absoluteTitle?: boolean
  description: string
  url?: string
  category?: string
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  metaKeywords?: string[] | null
  authorName?: string
  /** Pass a page-specific OG image to override the site default. */
  ogImage?: { url: string; width?: number; height?: number; alt?: string }
  openGraphTitle?: string
  openGraphDescription?: string
}): Metadata {
  const image = ogImage ?? DEFAULT_OG_IMAGE
  const publishedDate = toIsoDate(publishedTime)
  const modifiedDate = toIsoDate(modifiedTime) ?? publishedDate
  const socialTitle = openGraphTitle ?? title
  const socialDescription = openGraphDescription ?? description

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: metaKeywords,
    ...(authorName && { authors: [{ name: authorName, url: `${siteUrl}/about` }] }),
    ...(url && { alternates: { canonical: url } }),
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      type: 'article',
      siteName,
      url,
      publishedTime: publishedDate,
      // Always carry a modifiedTime so Google sees freshness signals
      modifiedTime: modifiedDate,
      section: category,
      tags,
      authors: authorName ? [authorName] : undefined,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: socialDescription,
      images: [image.url],
      ...(authorName && { creator: authorName }),
    },
  }
}

export function buildCategoryMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${path}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName,
      url: `${siteUrl}${path}`,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  }
}

export function buildTopicMetadata({
  topicName,
  description,
  slug,
}: {
  topicName: string
  description: string
  slug: string
}): Metadata {
  const title = `${topicName} — Guides, Scripts & News`
  return buildCategoryMetadata({
    title,
    description,
    path: `/${slug}`,
  })
}
