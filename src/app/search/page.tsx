import type { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import { search, TYPE_LABELS, type ContentType } from '@/lib/search'

type Props = { searchParams: Promise<{ q?: string }> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams
  const query = q?.trim() ?? ''
  return {
    title: query ? `"${query}" — Search AdminSignal` : 'Search — AdminSignal',
    description: query
      ? `AdminSignal search results for "${query}"`
      : 'Search guides, scripts, news, reviews, and more on AdminSignal.',
    robots: { index: false, follow: true },
  }
}

const TYPE_PILL: Record<ContentType, string> = {
  news: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  tutorial: 'bg-primary/10 text-primary border-primary/20',
  script: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  review: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  comparison: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  troubleshooting: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  topic: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams
  const query = q?.trim() ?? ''
  const results = query.length >= 2 ? search(query) : []
  const hasQuery = query.length > 0
  const tooShort = hasQuery && query.length < 2

  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Search
          </p>

          <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {hasQuery ? (
              <>
                Results for{' '}
                <span className="text-primary">&ldquo;{query}&rdquo;</span>
              </>
            ) : (
              'Search AdminSignal'
            )}
          </h1>

          {!hasQuery && (
            <p className="text-base leading-relaxed text-muted">
              Use the search box in the header to find guides, tutorials, scripts, news, reviews,
              comparisons, and troubleshooting articles across the entire AdminSignal library.
            </p>
          )}

          {tooShort && (
            <p className="text-base text-muted">
              Please enter at least two characters to search.
            </p>
          )}

          {hasQuery && !tooShort && results.length === 0 && (
            <div className="space-y-4">
              <p className="text-base text-muted">
                No results found for &ldquo;{query}&rdquo;. Try different or broader keywords.
              </p>
              <p className="text-sm text-muted/60">
                Browse by section:{' '}
                <Link href="/tutorials" className="text-primary underline underline-offset-2">
                  Tutorials
                </Link>
                {' · '}
                <Link href="/scripts" className="text-primary underline underline-offset-2">
                  Scripts
                </Link>
                {' · '}
                <Link href="/news" className="text-primary underline underline-offset-2">
                  News
                </Link>
                {' · '}
                <Link href="/topics" className="text-primary underline underline-offset-2">
                  All Topics
                </Link>
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div>
              <p className="mb-4 text-sm text-muted/60">
                {results.length} result{results.length !== 1 ? 's' : ''}
              </p>

              <ul className="space-y-3">
                {results.map((result) => (
                  <li key={result.href}>
                    <Link
                      href={result.href}
                      className="group flex flex-col gap-2.5 rounded-xl border border-border bg-surface p-5 shadow-card transition-all hover:border-border-strong hover:bg-surface-elevated/40"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${TYPE_PILL[result.type]}`}
                        >
                          {TYPE_LABELS[result.type]}
                        </span>
                        {result.meta && (
                          <span className="text-xs text-muted/50">{result.meta}</span>
                        )}
                      </div>
                      <p className="text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                        {result.title}
                      </p>
                      <p className="line-clamp-2 text-sm leading-relaxed text-muted">
                        {result.excerpt}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
