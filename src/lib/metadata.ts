import type { Metadata } from 'next'

const siteUrl = 'https://adminsignal.com'
const siteName = 'AdminSignal'

export function buildArticleMetadata({
  title,
  description,
  category,
  publishedTime,
  modifiedTime,
  tags,
  authorName,
}: {
  title: string
  description: string
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
    openGraph: {
      title,
      description,
      type: 'article',
      siteName,
      publishedTime,
      modifiedTime,
      section: category,
      tags,
      authors: authorName ? [authorName] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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
