import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import { mdxComponents } from '@/components/ui/MdxComponents'
import { reviews } from '@/data/reviews'
import { getAuthor } from '@/data/authors'
import { getContentItem, getContentSlugs } from '@/lib/content'
import { buildArticleMetadata } from '@/lib/metadata'
import { articleSchema, reviewSchema, breadcrumbSchema } from '@/lib/schema'
import Container from '@/components/layout/Container'
import Breadcrumbs from '@/components/article/Breadcrumbs'
import TableOfContents from '@/components/article/TableOfContents'
import AuthorBox from '@/components/article/AuthorBox'
import RelatedContent from '@/components/article/RelatedContent'
import AdSlot from '@/components/article/AdSlot'
import TrustBanner from '@/components/article/TrustBanner'
import Prose from '@/components/ui/Prose'
import Badge from '@/components/ui/Badge'
import StructuredData from '@/components/StructuredData'
import { Star, CheckCircle2, XCircle } from 'lucide-react'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getContentSlugs('reviews').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const review = reviews.find((r) => r.slug === slug)
  if (!review) return {}
  const author = getAuthor(review.authorId)
  return buildArticleMetadata({
    title: review.title,
    description: review.excerpt,
    url: `https://www.adminsignal.com/reviews/${slug}`,
    category: review.category,
    publishedTime: review.publishedAt,
    tags: [review.productName, review.category],
    authorName: author?.name,
  })
}

function RatingBar({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-0.5">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i + 1 <= Math.floor(value)
          const half = !filled && i < value
          return (
            <Star
              key={i}
              className={`h-5 w-5 ${filled ? 'fill-amber-400 text-amber-400' : half ? 'fill-amber-400/50 text-amber-400' : 'text-muted/30'}`}
            />
          )
        })}
      </div>
      <span className="text-2xl font-bold text-foreground">{value.toFixed(1)}</span>
      <span className="text-sm text-muted">/ {max}</span>
    </div>
  )
}

export default async function ReviewArticlePage({ params }: Props) {
  const { slug } = await params
  const review = reviews.find((r) => r.slug === slug)
  if (!review) notFound()

  let content = ''
  let headings: { id: string; text: string; level: number }[] = []
  let lastReviewed: string | undefined
  let reviewNote: string | undefined

  try {
    const item = getContentItem('reviews', slug)
    content = item.content
    headings = item.headings
    lastReviewed = item.frontmatter.lastReviewed as string | undefined
    reviewNote = item.frontmatter.reviewNote as string | undefined
  } catch {
    notFound()
  }

  const author = getAuthor(review.authorId)

  const relatedReviews = reviews
    .filter((r) => r.id !== review.id && r.category === review.category)
    .slice(0, 3)
    .map((r) => ({
      title: r.title,
      href: `/reviews/${r.slug}`,
      type: 'review' as const,
      excerpt: r.excerpt,
      meta: `${r.rating}/5 · ${r.readTime}`,
    }))

  const pageUrl = `https://www.adminsignal.com/reviews/${slug}`

  const jsonLdArticle = articleSchema({
    title: review.title,
    description: review.excerpt,
    publishedTime: review.publishedAt,
    modifiedTime: lastReviewed,
    authorName: author?.name,
    url: pageUrl,
    tags: [review.productName, review.category],
  })

  const jsonLdReview = reviewSchema({
    itemName: review.productName,
    itemType: 'SoftwareApplication',
    ratingValue: review.rating,
    reviewBody: review.verdict,
    authorName: author?.name ?? 'AdminSignal',
    datePublished: review.publishedAt,
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Reviews', url: 'https://www.adminsignal.com/reviews' },
    { name: review.title, url: pageUrl },
  ])

  const badgeVariant: Record<string, 'new' | 'difficulty' | 'category'> = {
    'Editors Choice': 'new',
    'Best Value': 'difficulty',
    Recommended: 'category',
  }

  return (
    <>
      <StructuredData data={jsonLdArticle} />
      <StructuredData data={jsonLdReview} />
      <StructuredData data={jsonLdBreadcrumb} />

      <div className="border-b border-border bg-surface/10 py-4">
        <Container>
          <Breadcrumbs
            crumbs={[
              { label: 'Home', href: '/' },
              { label: 'Reviews', href: '/reviews' },
              { label: review.title },
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
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge variant="category">{review.category}</Badge>
                  {review.badge && (
                    <Badge variant={badgeVariant[review.badge] ?? 'category'}>{review.badge}</Badge>
                  )}
                </div>
                <h1 className="mb-4 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  {review.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted/70">
                  {author && <span>{author.name}</span>}
                  {author && <span aria-hidden="true">·</span>}
                  <time dateTime={review.publishedAt}>{review.date}</time>
                  <span aria-hidden="true">·</span>
                  <span>{review.readTime}</span>
                </div>
              </header>

              <div className="mb-8 rounded-xl border border-border bg-surface p-6">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted/60">
                  Our Rating
                </p>
                <div className="mb-6">
                  <RatingBar value={review.rating} />
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <p className="mb-3 text-sm font-semibold text-foreground">Pros</p>
                    <ul className="space-y-2">
                      {review.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2 text-sm text-muted">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-3 text-sm font-semibold text-foreground">Cons</p>
                    <ul className="space-y-2">
                      {review.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2 text-sm text-muted">
                          <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="text-sm font-semibold text-foreground">Verdict</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{review.verdict}</p>
                </div>
              </div>

              <AdSlot variant="banner" className="mb-8" />

              <Prose>
                <MDXRemote source={content} components={mdxComponents} />
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

          {relatedReviews.length > 0 && (
            <div className="mt-14 border-t border-border pt-12">
              <RelatedContent items={relatedReviews} heading="More reviews" />
            </div>
          )}
        </div>
      </Container>
    </>
  )
}
