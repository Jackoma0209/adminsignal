/**
 * JSON-LD structured data helpers.
 * Use the native <script> tag pattern — JSON-LD is structured data, not executable code.
 * Sanitise < chars to prevent XSS injection via dangerouslySetInnerHTML.
 */

export function safeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function articleSchema({
  title,
  description,
  publishedTime,
  modifiedTime,
  authorName,
  url,
}: {
  title: string
  description: string
  publishedTime?: string
  modifiedTime?: string
  authorName?: string
  url?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    datePublished: publishedTime,
    dateModified: modifiedTime ?? publishedTime,
    author: authorName
      ? { '@type': 'Person', name: authorName }
      : { '@type': 'Organization', name: 'AdminSignal' },
    publisher: {
      '@type': 'Organization',
      name: 'AdminSignal',
      url: 'https://adminsignal.com',
    },
    url,
    inLanguage: 'en-US',
    audience: {
      '@type': 'Audience',
      audienceType: 'IT Professionals',
    },
  }
}

export function softwareApplicationSchema({
  name,
  description,
  url,
  applicationCategory = 'DeveloperApplication',
}: {
  name: string
  description: string
  url?: string
  applicationCategory?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory,
    operatingSystem: 'Windows',
  }
}

export function breadcrumbSchema(
  crumbs: { name: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

export function reviewSchema({
  itemName,
  itemType = 'SoftwareApplication',
  ratingValue,
  reviewBody,
  authorName,
  datePublished,
}: {
  itemName: string
  itemType?: string
  ratingValue: number
  reviewBody: string
  authorName?: string
  datePublished?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue,
      bestRating: 5,
    },
    name: `Review of ${itemName}`,
    reviewBody,
    datePublished,
    author: authorName
      ? { '@type': 'Person', name: authorName }
      : { '@type': 'Organization', name: 'AdminSignal' },
    itemReviewed: {
      '@type': itemType,
      name: itemName,
    },
  }
}
