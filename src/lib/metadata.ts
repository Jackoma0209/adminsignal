import type { Metadata } from 'next'

const siteUrl = 'https://www.adminsignal.com'
const siteName = 'AdminSignal'

export function buildArticleMetadata({
  title,
  description,
  url,
  category,
  publishedTime,
  modifiedTime,
  tags,
  authorName,
}: {
  title: string
  description: string
  url?: string
  category?: string
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  authorName?: string
}): Metadata {
  return {
    title,
    description,
    keywords: tags,
    ...(authorName && { authors: [{ name: authorName, url: `${siteUrl}/about` }] }),
    ...(url && { alternates: { canonical: url } }),
    openGraph: {
      title,
      description,
      type: 'article',
      siteName,
      url,
      publishedTime,
      // Always carry a modifiedTime so Google sees freshness signals
      modifiedTime: modifiedTime ?? publishedTime,
      section: category,
      tags,
      authors: authorName ? [authorName] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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
