import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import { signals } from '@/data/signals'
import { getAuthor } from '@/data/authors'
import { getContentItem, getContentSlugs } from '@/lib/content'
import { buildArticleMetadata } from '@/lib/metadata'
import { isRecentItem } from '@/lib/utils'
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

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getContentSlugs('news').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const signal = signals.find((s) => s.slug === slug)
  if (!signal) return {}
  const author = signal.authorId ? getAuthor(signal.authorId) : undefined
  return buildArticleMetadata({
    title: signal.title,
    description: signal.excerpt,
    url: `https://adminsignal.com/news/${slug}`,
    category: signal.category,
    publishedTime: signal.publishedAt,
    tags: signal.tags,
    authorName: author?.name,
  })
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params
  const signal = signals.find((s) => s.slug === slug)
  if (!signal) notFound()

  let content = ''
  let headings: { id: string; text: string; level: number }[] = []
  let lastReviewed: string | undefined
  let reviewNote: string | undefined

  try {
    const item = getContentItem('news', slug)
    content = item.content
    headings = item.headings
    lastReviewed = item.frontmatter.lastReviewed as string | undefined
    reviewNote = item.frontmatter.reviewNote as string | undefined
  } catch {
    notFound()
  }

  const author = signal.authorId ? getAuthor(signal.authorId) : undefined

  const relatedSignals = signals
    .filter((s) => s.id !== signal.id && s.category === signal.category)
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/news/${s.slug}`,
      type: 'news' as const,
      excerpt: s.excerpt,
      meta: s.date,
    }))

  const jsonLdArticle = articleSchema({
    title: signal.title,
    description: signal.excerpt,
    publishedTime: signal.publishedAt,
    authorName: author?.name,
    url: `https://adminsignal.com/news/${slug}`,
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://adminsignal.com' },
    { name: 'News', url: 'https://adminsignal.com/news' },
    { name: signal.title, url: `https://adminsignal.com/news/${slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLdBreadcrumb) }}
      />

      <div className="border-b border-border bg-surface/10 py-4">
        <Container>
          <Breadcrumbs
            crumbs={[
              { label: 'Home', href: '/' },
              { label: 'News', href: '/news' },
              { label: signal.title },
            ]}
          />
        </Container>
      </div>

      <Container>
        <div className="py-10 lg:py-14">
          {lastReviewed && (
            <TrustBanner lastReviewed={lastReviewed} note={reviewNote} />
          )}

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
            {/* Main content */}
            <article>
              <header className="mb-8">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge variant="category">{signal.category}</Badge>
                  {!signal.isDemo && isRecentItem(signal.publishedAt) && <Badge variant="new">New</Badge>}
                  {signal.isDemo && (
                    <span className="rounded border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400">
                      Sample / Demo content
                    </span>
                  )}
                </div>
                <h1 className="mb-4 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  {signal.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted/70">
                  {author && <span>{author.name}</span>}
                  {author && <span aria-hidden="true">·</span>}
                  <time dateTime={signal.publishedAt}>{signal.date}</time>
                  <span aria-hidden="true">·</span>
                  <span>{signal.readTime}</span>
                  {signal.source && signal.sourceUrl && (
                    <>
                      <span aria-hidden="true">·</span>
                      <a
                        href={signal.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary"
                      >
                        {signal.source}
                      </a>
                    </>
                  )}
                  {signal.source && !signal.sourceUrl && (
                    <><span aria-hidden="true">·</span><span>{signal.source}</span></>
                  )}
                </div>
              </header>

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

            {/* Sidebar */}
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

          {relatedSignals.length > 0 && (
            <div className="mt-14 border-t border-border pt-12">
              <RelatedContent items={relatedSignals} heading="More from this category" />
            </div>
          )}
        </div>
      </Container>
    </>
  )
}
