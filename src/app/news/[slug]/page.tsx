import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import type { Metadata } from 'next'
import { mdxComponents } from '@/components/ui/MdxComponents'
import { liveSignals, signals } from '@/data/signals'
import { getAuthor } from '@/data/authors'
import { getContentItem, getContentSlugs } from '@/lib/content'
import { buildArticleMetadata } from '@/lib/metadata'
import { articleSchema, breadcrumbSchema } from '@/lib/schema'
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
import { isRecentItem } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const liveContentSlugs = new Set(getContentSlugs('news'))
  return liveSignals
    .filter((signal) => liveContentSlugs.has(signal.slug))
    .map((signal) => ({ slug: signal.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const signal = signals.find((s) => s.slug === slug)
  if (!signal) return {}
  const author = signal.authorId ? getAuthor(signal.authorId) : undefined
  return buildArticleMetadata({
    title: signal.title,
    description: signal.excerpt,
    url: `https://www.adminsignal.com/news/${slug}`,
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
  let frontmatter: Record<string, unknown> = {}

  try {
    const item = getContentItem('news', slug)
    content = item.content
    headings = item.headings
    frontmatter = item.frontmatter
    lastReviewed = item.frontmatter.lastReviewed as string | undefined
    reviewNote = item.frontmatter.reviewNote as string | undefined
  } catch {
    notFound()
  }

  const author = signal.authorId ? getAuthor(signal.authorId) : undefined

  // Prefer image from signals.ts; fall back to MDX frontmatter for legacy content
  const featuredImage =
    signal.image ??
    (typeof frontmatter.image === 'string' ? frontmatter.image : undefined) ??
    null

  const featuredImageAlt =
    typeof frontmatter.imageAlt === 'string'
      ? frontmatter.imageAlt
      : signal.title

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

  const pageUrl = `https://www.adminsignal.com/news/${slug}`

  const jsonLdArticle = articleSchema({
    type: 'NewsArticle',
    title: signal.title,
    description: signal.excerpt,
    publishedTime: signal.publishedAt,
    modifiedTime: lastReviewed,
    authorName: author?.name,
    url: pageUrl,
    tags: signal.tags,
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'News', url: 'https://www.adminsignal.com/news' },
    { name: signal.title, url: pageUrl },
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

              {/* ── Featured image ──────────────────────────────────────── */}
              {featuredImage && (
                <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl bg-surface">
                  <Image
                    src={featuredImage}
                    alt={featuredImageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 700px"
                    priority
                  />
                  {/* Subtle gradient keeps bottom legible against any image */}
                  <div
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 to-transparent"
                    aria-hidden="true"
                  />
                </div>
              )}

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
