import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import { comparisons } from '@/data/comparisons'
import { getAuthor } from '@/data/authors'
import { getContentItem, getContentSlugs } from '@/lib/content'
import { buildArticleMetadata } from '@/lib/metadata'
import { articleSchema, breadcrumbSchema, safeJsonLd } from '@/lib/schema'
import Container from '@/components/layout/Container'
import Breadcrumbs from '@/components/article/Breadcrumbs'
import TableOfContents from '@/components/article/TableOfContents'
import AuthorBox from '@/components/article/AuthorBox'
import RelatedContent from '@/components/article/RelatedContent'
import AdSlot from '@/components/article/AdSlot'
import TrustBanner from '@/components/article/TrustBanner'
import Prose from '@/components/ui/Prose'
import Badge from '@/components/ui/Badge'
import { ArrowLeftRight, Trophy } from 'lucide-react'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getContentSlugs('comparisons').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const comparison = comparisons.find((c) => c.slug === slug)
  if (!comparison) return {}
  const author = getAuthor(comparison.authorId)
  return buildArticleMetadata({
    title: comparison.title,
    description: comparison.excerpt,
    url: `https://adminsignal.com/comparisons/${slug}`,
    category: comparison.category,
    publishedTime: comparison.publishedAt,
    authorName: author?.name,
  })
}

export default async function ComparisonArticlePage({ params }: Props) {
  const { slug } = await params
  const comparison = comparisons.find((c) => c.slug === slug)
  if (!comparison) notFound()

  let content = ''
  let headings: { id: string; text: string; level: number }[] = []
  let lastReviewed: string | undefined
  let reviewNote: string | undefined

  try {
    const item = getContentItem('comparisons', slug)
    content = item.content
    headings = item.headings
    lastReviewed = item.frontmatter.lastReviewed as string | undefined
    reviewNote = item.frontmatter.reviewNote as string | undefined
  } catch {
    notFound()
  }

  const author = getAuthor(comparison.authorId)

  const relatedComparisons = comparisons
    .filter((c) => c.id !== comparison.id && c.category === comparison.category)
    .slice(0, 3)
    .map((c) => ({
      title: c.title,
      href: `/comparisons/${c.slug}`,
      type: 'comparison' as const,
      excerpt: c.excerpt,
      meta: c.readTime,
    }))

  const jsonLd = articleSchema({
    title: comparison.title,
    description: comparison.excerpt,
    publishedTime: comparison.publishedAt,
    authorName: author?.name,
    url: `https://adminsignal.com/comparisons/${slug}`,
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://adminsignal.com' },
    { name: 'Comparisons', url: 'https://adminsignal.com/comparisons' },
    { name: comparison.title, url: `https://adminsignal.com/comparisons/${slug}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLdBreadcrumb) }} />

      <div className="border-b border-border bg-surface/10 py-4">
        <Container>
          <Breadcrumbs
            crumbs={[
              { label: 'Home', href: '/' },
              { label: 'Comparisons', href: '/comparisons' },
              { label: comparison.title },
            ]}
          />
        </Container>
      </div>

      <Container>
        <div className="py-10 lg:py-14">
          {lastReviewed && <TrustBanner lastReviewed={lastReviewed} note={reviewNote} />}

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
            <article>
              <header className="mb-8">
                <div className="mb-4">
                  <Badge variant="category">{comparison.category}</Badge>
                </div>
                <h1 className="mb-4 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  {comparison.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted/70">
                  {author && <span>{author.name}</span>}
                  {author && <span aria-hidden="true">·</span>}
                  <time dateTime={comparison.publishedAt}>{comparison.date}</time>
                  <span aria-hidden="true">·</span>
                  <span>{comparison.readTime}</span>
                </div>
              </header>

              {/* At-a-glance comparison card */}
              <div className="mb-8 rounded-xl border border-border bg-surface p-6">
                <div className="mb-4 flex items-center justify-center gap-4">
                  <span className="rounded-lg border border-border bg-surface-elevated px-4 py-2 text-sm font-semibold text-foreground">
                    {comparison.productA}
                  </span>
                  <ArrowLeftRight className="h-5 w-5 shrink-0 text-muted/40" />
                  <span className="rounded-lg border border-border bg-surface-elevated px-4 py-2 text-sm font-semibold text-foreground">
                    {comparison.productB}
                  </span>
                </div>
                {comparison.winner && (
                  <div className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-foreground">
                    <Trophy className="h-4 w-4 text-amber-400" />
                    <span>Winner: {comparison.winner}</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed text-muted">{comparison.verdict}</p>
              </div>

              <AdSlot variant="banner" className="mb-8" />

              <Prose>
                <MDXRemote source={content} />
              </Prose>

              {author && (
                <div className="mt-12">
                  <AuthorBox author={author} />
                </div>
              )}
            </article>

            <aside>
              <div className="sticky top-20">
                {headings.length >= 2 && (
                  <div className="mb-6 rounded-xl border border-border bg-surface p-5">
                    <TableOfContents headings={headings} />
                  </div>
                )}
                <AdSlot variant="sidebar" />
              </div>
            </aside>
          </div>

          {relatedComparisons.length > 0 && (
            <div className="mt-14 border-t border-border pt-12">
              <RelatedContent items={relatedComparisons} heading="More comparisons" />
            </div>
          )}
        </div>
      </Container>
    </>
  )
}
