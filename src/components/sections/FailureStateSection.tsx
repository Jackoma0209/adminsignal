import Link from 'next/link'
import { AlertCircle, ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import {
  troubleshootingArticles,
  type TroubleshootingArticle,
} from '@/data/troubleshooting'
import { isNoindexTroubleshootingSlug } from '@/lib/noindex'

const PREFERRED_SLUGS = [
  'intune-device-not-syncing',
  'autopilot-device-not-importing-hardware-hash',
  'intune-win32-app-install-stuck-waiting',
  'intune-company-portal-enrollment-stuck',
  'group-policy-not-applying-diagnosis',
  'wufb-deferral-not-respected',
] as const

const difficultyVariant: Record<
  TroubleshootingArticle['difficulty'],
  'category' | 'difficulty' | 'language'
> = {
  Beginner: 'category',
  Intermediate: 'difficulty',
  Advanced: 'language',
}

export default function FailureStateSection() {
  const bySlug = new Map(troubleshootingArticles.map((article) => [article.slug, article]))

  const articles = PREFERRED_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (article): article is TroubleshootingArticle =>
      Boolean(article) && !isNoindexTroubleshootingSlug(article.slug),
  )

  if (articles.length === 0) return null

  return (
    <section className="border-t border-border py-16">
      <Container>
        <SectionHeader
          eyebrow="When it is broken"
          title="Diagnosis guides, not vendor overviews"
          description="Start with the failure: stale Intune check-in, Autopilot import, Win32 stuck at waiting, Company Portal enrolment, Group Policy, or WUfB deferrals that do not stick. These pages are operator diagnosis sequences, not product comparisons."
          action={
            <Link
              href="/troubleshooting"
              className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              Browse troubleshooting
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/troubleshooting/${article.slug}`}
              className="group flex flex-col gap-2 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong hover:bg-surface-elevated/40"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted/70">
                  <AlertCircle className="h-3 w-3" aria-hidden="true" />
                  {article.category}
                </span>
                <Badge variant={difficultyVariant[article.difficulty]}>{article.difficulty}</Badge>
              </div>
              <h3 className="text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                {article.title}
              </h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-muted">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
