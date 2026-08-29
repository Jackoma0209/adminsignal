import Link from 'next/link'
import { cn } from '@/lib/utils'
import NewsletterSignupForm from '@/components/sections/NewsletterSignupForm'

interface ArticleNewsletterProps {
  heading: string
  description: string
  templateHref?: string
  templateLabel?: string
  inputId?: string
  className?: string
}

export default function ArticleNewsletter({
  heading,
  description,
  templateHref,
  templateLabel,
  inputId = 'article-newsletter-email',
  className,
}: ArticleNewsletterProps) {
  const newsletterEnabled = Boolean(
    process.env.MAILERLITE_API_TOKEN && process.env.MAILERLITE_GROUP_ID,
  )

  const downloadHref = templateHref ?? '/templates'
  const downloadLabel = templateLabel ?? 'Download operator templates'

  return (
    <aside className={cn('mt-10 rounded-xl border border-border bg-surface p-5', className)}>
      <h2 className="text-base font-semibold tracking-tight text-foreground">{heading}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>

      {newsletterEnabled ? (
        <>
          <div className="mt-4">
            <NewsletterSignupForm
              enabled
              inputId={inputId}
              className="mx-0 max-w-none border-0 bg-transparent p-0 shadow-none"
            />
          </div>
          {templateHref && templateLabel && (
            <p className="mt-4 text-sm leading-relaxed text-muted">
              <Link href={templateHref} className="font-medium text-primary hover:underline">
                {templateLabel}
              </Link>
            </p>
          )}
        </>
      ) : (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href={downloadHref}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {downloadLabel}
          </Link>
          <a
            href="/rss.xml"
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground"
          >
            RSS feed
          </a>
          <Link
            href="/contact"
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground"
          >
            Contact AdminSignal
          </Link>
        </div>
      )}
    </aside>
  )
}
