import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import { guides } from '@/data/guides'
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
import AffiliateBlock from '@/components/article/AffiliateBlock'
import Prose from '@/components/ui/Prose'
import Badge from '@/components/ui/Badge'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getContentSlugs('tutorials').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = guides.find((g) => g.slug === slug)
  if (!guide) return {}
  const author = guide.authorId ? getAuthor(guide.authorId) : undefined
  return buildArticleMetadata({
    title: guide.title,
    description: guide.excerpt,
    category: guide.category,
    publishedTime: guide.date,
    tags: guide.tags,
    authorName: author?.name,
  })
}

export default async function TutorialPage({ params }: Props) {
  const { slug } = await params
  const guide = guides.find((g) => g.slug === slug)
  if (!guide) notFound()

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
    .filter((g) => g.id !== guide.id && g.category === guide.category)
    .slice(0, 3)
    .map((g) => ({
      title: g.title,
      href: `/tutorials/${g.slug}`,
      type: 'tutorial' as const,
      excerpt: g.excerpt,
      meta: `${g.readTime} · ${g.difficulty}`,
    }))

  const jsonLd = articleSchema({
    title: guide.title,
    description: guide.excerpt,
    publishedTime: guide.date,
    authorName: author?.name,
    url: `https://adminsignal.com/tutorials/${slug}`,
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://adminsignal.com' },
    { name: 'Tutorials', url: 'https://adminsignal.com/tutorials' },
    { name: guide.title, url: `https://adminsignal.com/tutorials/${slug}` },
  ])

  const difficultyVariant: Record<typeof guide.difficulty, 'category' | 'difficulty' | 'language'> = {
    Beginner: 'category',
    Intermediate: 'difficulty',
    Advanced: 'language',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLdBreadcrumb) }} />

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
          {lastReviewed && <TrustBanner lastReviewed={lastReviewed} note={reviewNote} />}

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
            <article>
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
                  <time dateTime={guide.date}>{guide.date}</time>
                  <span aria-hidden="true">·</span>
                  <span>{guide.readTime}</span>
                </div>
              </header>

              <AdSlot variant="banner" className="mb-8" />

              <Prose>
                <MDXRemote source={content} />
              </Prose>

              <AffiliateBlock
                toolName="Microsoft Intune"
                tagline="Manage, secure, and report on all your endpoints from a single cloud-native console."
                href="https://intune.microsoft.com"
                badge="Recommended"
                external
              />

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

          {relatedGuides.length > 0 && (
            <div className="mt-14 border-t border-border pt-12">
              <RelatedContent items={relatedGuides} heading="Related tutorials" />
            </div>
          )}
        </div>
      </Container>
    </>
  )
}
