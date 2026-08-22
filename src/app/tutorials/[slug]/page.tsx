import { notFound, permanentRedirect } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import type { Metadata } from 'next'
import Link from 'next/link'
import { mdxComponents } from '@/components/ui/MdxComponents'
import { guides } from '@/data/guides'
import { getAuthor } from '@/data/authors'
import { getContentItem, getContentSlugs } from '@/lib/content'
import { buildArticleMetadata } from '@/lib/metadata'
import {
  getDuplicateTutorialRedirect,
  isNoindexHref,
  isNoindexTutorialSlug,
  withNoindex,
} from '@/lib/noindex'
import { articleSchema, breadcrumbSchema } from '@/lib/schema'
import Container from '@/components/layout/Container'
import Breadcrumbs from '@/components/article/Breadcrumbs'
import TableOfContents from '@/components/article/TableOfContents'
import AuthorBox from '@/components/article/AuthorBox'
import RelatedContent from '@/components/article/RelatedContent'
import AdSlot from '@/components/article/AdSlot'
import TrustBanner from '@/components/article/TrustBanner'
import AffiliateBlock from '@/components/article/AffiliateBlock'
import EditorialReviewNotice from '@/components/article/EditorialReviewNotice'
import Prose from '@/components/ui/Prose'
import Badge from '@/components/ui/Badge'
import StructuredData from '@/components/StructuredData'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getContentSlugs('tutorials').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = guides.find((item) => item.slug === slug)
  if (!guide) return {}
  const author = guide.authorId ? getAuthor(guide.authorId) : undefined
  const duplicateRedirect = getDuplicateTutorialRedirect(slug)
  const canonicalPath = duplicateRedirect ?? `/tutorials/${slug}`
  const metadata = buildArticleMetadata({
    title: guide.title,
    description: guide.excerpt,
    url: `https://www.adminsignal.com${canonicalPath}`,
    category: guide.category,
    publishedTime: guide.publishedAt,
    tags: guide.tags,
    authorName: author?.name,
  })

  return duplicateRedirect || isNoindexTutorialSlug(slug) ? withNoindex(metadata) : metadata
}

export default async function TutorialPage({ params }: Props) {
  const { slug } = await params
  const duplicateRedirect = getDuplicateTutorialRedirect(slug)
  if (duplicateRedirect) permanentRedirect(duplicateRedirect)

  const guide = guides.find((item) => item.slug === slug)
  if (!guide) notFound()
  const underReview = isNoindexTutorialSlug(slug)

  let content = ''
  let headings: { id: string; text: string; level: number }[] = []
  let lastReviewed: string | undefined
  let reviewNote: string | undefined

  try {
    const item = getContentItem('tutorials', slug)
    content = item.content
    headings = item.headings
    lastReviewed = item.frontmatter.lastReviewed as string | undefined
    reviewNote = item.frontmatter.reviewNote as string | undefined
  } catch {
    notFound()
  }

  const author = guide.authorId ? getAuthor(guide.authorId) : undefined

  const relatedGuides = guides
    .filter((item) => {
      const href = item.href ?? `/tutorials/${item.slug}`
      return item.id !== guide.id && item.category === guide.category && !isNoindexHref(href)
    })
    .slice(0, 3)
    .map((item) => ({
      title: item.title,
      href: item.href ?? `/tutorials/${item.slug}`,
      type: 'tutorial' as const,
      excerpt: item.excerpt,
      meta: `${item.readTime} · ${item.difficulty}`,
    }))

  const pageUrl = `https://www.adminsignal.com/tutorials/${slug}`

  const jsonLd = articleSchema({
    title: guide.title,
    description: guide.excerpt,
    publishedTime: guide.publishedAt,
    modifiedTime: lastReviewed,
    authorName: author?.name,
    url: pageUrl,
    tags: guide.tags,
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Tutorials', url: 'https://www.adminsignal.com/tutorials' },
    { name: guide.title, url: pageUrl },
  ])

  const difficultyVariant: Record<typeof guide.difficulty, 'category' | 'difficulty' | 'language'> = {
    Beginner: 'category',
    Intermediate: 'difficulty',
    Advanced: 'language',
  }

  return (
    <>
      {!underReview && <StructuredData data={jsonLd} />}
      {!underReview && <StructuredData data={jsonLdBreadcrumb} />}

      <div className="border-b border-border bg-surface/10 py-4">
        <Container>
          <Breadcrumbs
            crumbs={[
              { label: 'Home', href: '/' },
              { label: 'Tutorials', href: '/tutorials' },
              { label: guide.title },
            ]}
          />
        </Container>
      </div>

      <Container>
        <div className="py-10 lg:py-14">
          {underReview ? (
            <div className="mb-10 space-y-6">
              <EditorialReviewNotice reason="The current draft mixes legacy Windows Autopilot concepts with Windows Autopilot device preparation. Its technical body has been withdrawn while it is rewritten against Microsoft's current device-preparation workflow." />
              <div className="rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
                <p className="font-semibold text-foreground">Use these published Autopilot pages instead</p>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>
                    <Link href="/comparisons/autopilot-v1-vs-v2-2026" className="font-medium text-primary hover:underline">
                      Autopilot v1 versus Device Preparation v2
                    </Link>{' '}
                    for the supported-capability comparison.
                  </li>
                  <li>
                    <Link href="/troubleshooting/autopilot-device-not-importing-hardware-hash" className="font-medium text-primary hover:underline">
                      Autopilot hardware hash import
                    </Link>{' '}
                    for CSV, duplicate identity, and profile assignment failures.
                  </li>
                  <li>
                    <Link href="/troubleshooting/autopilot-enrollment-status-page-stuck" className="font-medium text-primary hover:underline">
                      Enrollment Status Page stuck
                    </Link>{' '}
                    for ESP diagnosis on classic Autopilot.
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            lastReviewed && <TrustBanner lastReviewed={lastReviewed} note={reviewNote} />
          )}

          <div className="grid min-w-0 grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
            <article className="min-w-0">
              <header className="mb-8">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge variant="category">{guide.category}</Badge>
                  <Badge variant={difficultyVariant[guide.difficulty]}>{guide.difficulty}</Badge>
                </div>
                <h1 className="mb-4 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  {guide.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted/70">
                  {author && <span>{author.name}</span>}
                  {author && <span aria-hidden="true">·</span>}
                  <time dateTime={guide.publishedAt}>{guide.date}</time>
                  <span aria-hidden="true">·</span>
                  <span>{guide.readTime}</span>
                </div>
              </header>

              {!underReview && <AdSlot variant="banner" className="mb-8" />}

              {!underReview && (
                <Prose>
                  <MDXRemote
                    source={content}
                    options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                    components={mdxComponents}
                  />
                </Prose>
              )}

              {!underReview && (
                <AffiliateBlock
                  toolName="Microsoft Intune"
                  tagline="Manage, secure, and report on all your endpoints from a single cloud-native console."
                  href="https://intune.microsoft.com"
                  badge="Recommended"
                  external
                />
              )}

              {author && !underReview && (
                <div className="mt-12">
                  <AuthorBox author={author} />
                </div>
              )}
            </article>

            {!underReview && (
              <aside className="min-w-0">
                <div className="sticky top-20">
                  {headings.length >= 2 && (
                    <div className="mb-6 rounded-xl border border-border bg-surface p-5">
                      <TableOfContents headings={headings} />
                    </div>
                  )}
                  <AdSlot variant="sidebar" />
                </div>
              </aside>
            )}
          </div>

          {relatedGuides.length > 0 && !underReview && (
            <div className="mt-14 border-t border-border pt-12">
              <RelatedContent items={relatedGuides} heading="Related tutorials" />
            </div>
          )}
        </div>
      </Container>
    </>
  )
}
