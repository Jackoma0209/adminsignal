/**
 * JSON-LD structured data helpers.
 * Use the native <script> tag pattern — JSON-LD is structured data, not executable code.
 * Sanitise < chars to prevent XSS injection via dangerouslySetInnerHTML.
 */

const SITE_URL = 'https://www.adminsignal.com'
const SITE_NAME = 'AdminSignal'
const DEFAULT_LANGUAGE = 'en-US'

type SchemaThing = Record<string, unknown>

type ListItem = {
  name: string
  url: string
}

function organizationRef() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: SITE_NAME,
    url: SITE_URL,
  }
}

function thingList(items?: string[]) {
  if (!items || items.length === 0) return undefined

  return items.map((item) => ({
    '@type': 'Thing',
    name: item,
  }))
}

function keywordList(items?: string[]) {
  if (!items || items.length === 0) return undefined
  return items.join(', ')
}

function cleanSchema<T extends SchemaThing>(data: T): T {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined),
  ) as T
}

function runtimePlatformFor(language: string): string {
  switch (language) {
    case 'PowerShell':
      return 'Windows'
    case 'Python':
      return 'Cross-platform'
    case 'Bash':
      return 'Linux / macOS'
    case 'Registry':
      return 'Windows'
    default:
      return 'Cross-platform'
  }
}

export function safeJsonLd(data: SchemaThing): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function personSchema({
  name,
  url,
  jobTitle,
  description,
  sameAs,
}: {
  name: string
  url?: string
  jobTitle?: string
  description?: string
  sameAs?: string[]
}) {
  return cleanSchema({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}#author`,
    name,
    url: url ?? SITE_URL,
    jobTitle,
    description,
    worksFor: {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    sameAs,
  })
}

export function organizationSchema({
  description,
}: {
  description?: string
} = {}) {
  return cleanSchema({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description,
    founder: {
      '@type': 'Person',
      '@id': `${SITE_URL}#author`,
      name: 'Jack',
    },
  })
}

export function websiteSchema({
  description,
}: {
  description?: string
} = {}) {
  return cleanSchema({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description,
    inLanguage: DEFAULT_LANGUAGE,
    publisher: organizationRef(),
  })
}

export function webPageSchema({
  title,
  description,
  url,
}: {
  title: string
  description: string
  url: string
}) {
  return cleanSchema({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    name: title,
    description,
    url,
    inLanguage: DEFAULT_LANGUAGE,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: organizationRef(),
  })
}

export function collectionPageSchema({
  title,
  description,
  url,
  items,
}: {
  title: string
  description: string
  url: string
  items: ListItem[]
}) {
  return cleanSchema({
    ...webPageSchema({ title, description, url }),
    '@type': 'CollectionPage',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  })
}

export function articleSchema({
  type = 'TechArticle',
  title,
  description,
  publishedTime,
  modifiedTime,
  authorName,
  url,
  tags,
}: {
  type?: string
  title: string
  description: string
  publishedTime?: string
  modifiedTime?: string
  authorName?: string
  url?: string
  tags?: string[]
}) {
  return cleanSchema({
    '@context': 'https://schema.org',
    '@type': type,
    headline: title,
    description,
    datePublished: publishedTime,
    dateModified: modifiedTime ?? publishedTime,
    author: authorName
      ? { '@type': 'Person', name: authorName }
      : organizationRef(),
    publisher: organizationRef(),
    mainEntityOfPage: url
      ? {
          '@type': 'WebPage',
          '@id': `${url}#webpage`,
        }
      : undefined,
    url,
    inLanguage: DEFAULT_LANGUAGE,
    audience: {
      '@type': 'Audience',
      audienceType: 'IT Professionals',
    },
    isAccessibleForFree: true,
    keywords: keywordList(tags),
    about: thingList(tags),
  })
}

export function softwareSourceCodeSchema({
  name,
  description,
  url,
  programmingLanguage,
  tags,
  authorName,
  dateCreated,
  dateModified,
}: {
  name: string
  description: string
  url?: string
  programmingLanguage: string
  tags?: string[]
  authorName?: string
  dateCreated?: string
  dateModified?: string
}) {
  return cleanSchema({
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name,
    description,
    url,
    programmingLanguage,
    runtimePlatform: runtimePlatformFor(programmingLanguage),
    author: authorName
      ? { '@type': 'Person', name: authorName }
      : organizationRef(),
    publisher: organizationRef(),
    dateCreated,
    dateModified,
    keywords: keywordList(tags),
    about: thingList(tags),
  })
}

export function aboutPageSchema({ description }: { description: string }) {
  const url = `${SITE_URL}/about`
  return cleanSchema({
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${url}#webpage`,
    name: `About ${SITE_NAME}`,
    description,
    url,
    inLanguage: DEFAULT_LANGUAGE,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: organizationRef(),
    publisher: organizationRef(),
  })
}

export function breadcrumbSchema(crumbs: ListItem[]) {
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
  return cleanSchema({
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
      : organizationRef(),
    itemReviewed: {
      '@type': itemType,
      name: itemName,
    },
    publisher: organizationRef(),
    inLanguage: DEFAULT_LANGUAGE,
  })
}
