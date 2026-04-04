import Link from 'next/link'
import Container from '@/components/layout/Container'

interface CategoryPageTemplateProps {
  eyebrow: string
  title: string
  description: string
  itemCount: number
  itemLabel?: string
  categories?: string[]
  activeCategory?: string
  basePath: string
  children: React.ReactNode
}

export default function CategoryPageTemplate({
  eyebrow,
  title,
  description,
  itemCount,
  itemLabel = 'articles',
  categories,
  activeCategory,
  basePath,
  children,
}: CategoryPageTemplateProps) {
  return (
    <>
      {/* Page header */}
      <div className="border-b border-border bg-surface/20 py-14">
        <Container>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">{description}</p>
          <p className="mt-4 text-xs text-muted/60">{itemCount} {itemLabel}</p>
        </Container>
      </div>

      {/* Category filter */}
      {categories && categories.length > 0 && (
        <div className="border-b border-border bg-surface/10 py-3">
          <Container>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={basePath}
                className={[
                  'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                  !activeCategory
                    ? 'border-primary/30 bg-primary-soft text-primary'
                    : 'border-border text-muted hover:border-border-strong hover:text-foreground-soft',
                ].join(' ')}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`${basePath}?category=${encodeURIComponent(cat)}`}
                  className={[
                    'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                    activeCategory === cat
                      ? 'border-primary/30 bg-primary-soft text-primary'
                      : 'border-border text-muted hover:border-border-strong hover:text-foreground-soft',
                  ].join(' ')}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* Content */}
      <section className="py-14">
        <Container>{children}</Container>
      </section>
    </>
  )
}
