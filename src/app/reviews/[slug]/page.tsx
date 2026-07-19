import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import { mdxComponents } from '@/components/ui/MdxComponents'
import { reviews } from '@/data/reviews'
import { getAuthor } from '@/data/authors'
import { getContentItem, getContentSlugs } from '@/lib/content'
import { buildArticleMetadata } from '@/lib/metadata'
import { withNoindex } from '@/lib/noindex'
import { articleSchema, breadcrumbSchema } from '@/lib/schema'
import Container from '@/components/layout/Container'
import Breadcrumbs from '@/components/article/Breadcrumbs'
import TableOfContents from '@/components/article/TableOfContents'
import AuthorBox from '@/components/article/AuthorBox'
import RelatedContent from '@/components/article/RelatedContent'
import Prose from '@/components/ui/Prose'
import Badge from '@/components/ui/Badge'
import StructuredData from '@/components/StructuredData'
import { CheckCircle2, CircleHelp } from 'lucide-react'

const siteUrl = 'https://www.adminsignal.com'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getContentSlugs('reviews').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const review = reviews.find((item) => item.slug === slug)
  if (!review) return {}
  const author = getAuthor(review.authorId)

  return withNoindex(
    buildArticleMetadata({
      title: review.title,
      description: review.excerpt,
      url: `${siteUrl}/reviews/${slug}`,
      category: review.category,
      publishedTime: review.publishedAt,
      tags: [review.productName, review.category, 'product evaluation'],
      authorName: author?.name,
    }),
  )
}

export default async function ReviewArticlePage({ params }: Props) {
  const { slug } = await params
  const review = reviews.find((item) => item.slug === slug)
  if (!review) notFound()

  let content = ''
  let headings: { id: string; text: string; level: number }[] = []

  try {
    const item = getContentItem('reviews', slug)
    content = item.content
    headings = item.headings
  } catch {
    notFound()
  }

  const author = getAuthor(review.authorId)
  const relatedReviews = reviews
    .filter((item) => item.id !== review.id && item.category === review.category)
    .slice(0, 3)
    .map((item) => ({
      title: item.title,
      href: `/reviews/${item.slug}`,
      type: 'review' as const,
      excerpt: item.excerpt,
      meta: `Evaluation notes · ${item.readTime}`,
    }))

  const pageUrl = `${siteUrl}/reviews/${slug}`
  const jsonLdArticle = articleSchema({
    title: review.title,
    description: review.excerpt,
    publishedTime: review.publishedAt,
    authorName: author?.name,
    url: pageUrl,
    tags: [review.productName, review.category, 'product evaluation'],
  })
  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Product evaluation notes', url: `${siteUrl}/reviews` },
    { name: review.title, url: pageUrl },
  ])

  return (
    <>
      <StructuredData data={jsonLdArticle} />
      <StructuredData data={jsonLdBreadcrumb} />

      <div className="border-b border-border bg-surface/10 py-4">
        <Container>
          <Breadcrumbs
            crumbs={[
              { label: 'Home', href: '/' },
              { label: 'Product evaluation notes', href: '/reviews' },
              { label: review.title },
            ]}
          />
        </Container>
      </div>

      <Container>
        <div className="py-10 lg:py-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
            <article>
              <header className="mb-8">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge variant="category">{review.category}</Badge>
                  <Badge variant="difficulty">Research-based evaluation</Badge>
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

              <div className="mb-8 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 text-sm leading-relaxed text-muted">
                <h2 className="font-semibold text-foreground">Research basis and limitations</h2>
                <p className="mt-2">
                  This page is a source-backed evaluation aid, not a claim of firsthand deployment, independent lab testing, measured product performance, support-response testing, or customer experience. Numerical ratings and review structured data are deliberately not used. Confirm current capabilities, licensing, support, data handling, and commercial terms with the vendor and through a controlled pilot.
                </p>
              </div>

              <div className="mb-8 rounded-xl border border-border bg-surface p-6">
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                  <section aria-labelledby="documented-strengths-heading">
                    <h2 id="documented-strengths-heading" className="text-sm font-semibold text-foreground">
                      Documented strengths to verify
                    </h2>
                    <ul className="mt-3 space-y-2">
                      {review.documentedStrengths.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-muted">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section aria-labelledby="validation-questions-heading">
                    <h2 id="validation-questions-heading" className="text-sm font-semibold text-foreground">
                      Validation questions
                    </h2>
                    <ul className="mt-3 space-y-2">
                      {review.validationQuestions.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-muted">
                          <CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
                <div className="mt-6 border-t border-border pt-4">
                  <h2 className="text-sm font-semibold text-foreground">Evaluation summary</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{review.summary}</p>
                </div>
              </div>

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
                <div className="rounded-xl border border-border bg-surface p-5 text-xs leading-relaxed text-muted">
                  <p className="font-semibold text-foreground">Indexing status</p>
                  <p className="mt-2">
                    This research archive is noindex while source coverage, evidence, and independent analysis are strengthened.
                  </p>
                </div>
              </div>
            </aside>
          </div>

          {relatedReviews.length > 0 && (
            <div className="mt-14 border-t border-border pt-12">
              <RelatedContent items={relatedReviews} heading="Related evaluation notes" />
            </div>
          )}
        </div>
      </Container>
    </>
  )
}
