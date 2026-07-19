import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import { isNoindexHref } from '@/lib/noindex'

export interface TopicContentItem {
  title: string
  href: string
  excerpt: string
  meta: string
  badge?: string
}

interface TopicHubPageTemplateProps {
  topicName: string
  description: string
  eyebrow?: string
  news: TopicContentItem[]
  tutorials: TopicContentItem[]
  troubleshooting?: TopicContentItem[]
  /**
   * Legacy compatibility only. Incomplete script resources are deliberately not
   * rendered, even if an older topic page still supplies this property.
   */
  scripts?: TopicContentItem[]
  relatedTopics: { name: string; href: string }[]
}

function HubContentRow({
  items,
  sectionTitle,
  viewAllHref,
}: {
  items: TopicContentItem[]
  sectionTitle: string
  viewAllHref: string
}) {
  const publicItems = items.filter((item) => !isNoindexHref(item.href))
  if (publicItems.length === 0) return null

  return (
    <div className="border-t border-border py-12">
      <Container>
        <SectionHeader
          title={sectionTitle}
          action={
            <Link
              href={viewAllHref}
              className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              View all <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {publicItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 shadow-card transition-colors hover:border-border-strong hover:bg-surface-elevated/40"
            >
              {item.badge && (
                <span className="inline-block w-fit rounded border border-primary/20 bg-primary-soft px-2 py-0.5 text-xs font-medium text-primary">
                  {item.badge}
                </span>
              )}
              <p className="text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                {item.title}
              </p>
              <p className="line-clamp-2 text-xs leading-relaxed text-muted">{item.excerpt}</p>
              <p className="mt-auto text-xs text-muted/60">{item.meta}</p>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default function TopicHubPageTemplate({
  topicName,
  description,
  eyebrow = 'Topic Hub',
  news,
  tutorials,
  troubleshooting = [],
  relatedTopics,
}: TopicHubPageTemplateProps) {
  return (
    <>
      <div className="border-b border-border bg-surface/20 py-14">
        <Container>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {topicName}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">{description}</p>
          <p className="mt-4 text-xs text-muted/60">
            Verified tutorials, troubleshooting guides, news, and analysis
          </p>
        </Container>
      </div>

      <HubContentRow items={news} sectionTitle="Latest News" viewAllHref="/news" />
      <HubContentRow items={tutorials} sectionTitle="Deep-Dive Tutorials" viewAllHref="/tutorials" />
      <HubContentRow
        items={troubleshooting}
        sectionTitle="Troubleshooting Guides"
        viewAllHref="/troubleshooting"
      />

      {relatedTopics.length > 0 && (
        <div className="border-t border-border py-12">
          <Container>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted/60">
              Related topics
            </p>
            <div className="flex flex-wrap gap-2">
              {relatedTopics.map((topic) => (
                <Link
                  key={topic.href}
                  href={topic.href}
                  className="rounded-full border border-border px-4 py-1.5 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground-soft"
                >
                  {topic.name}
                </Link>
              ))}
            </div>
          </Container>
        </div>
      )}
    </>
  )
}
