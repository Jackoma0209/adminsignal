import Link from 'next/link'
import Container from '@/components/layout/Container'

export default function NotFound() {
  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">404</p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Page not found
          </h1>
          <p className="mb-8 text-base leading-relaxed text-muted">
            That URL doesn&apos;t exist or has moved. Try one of these instead:
          </p>
          <ul className="mb-10 space-y-2 text-sm text-muted">
            <li>
              <Link href="/tutorials" className="text-primary hover:underline">
                Tutorials
              </Link>{' '}
              — step-by-step guides for Microsoft environments
            </li>
            <li>
              <Link href="/scripts" className="text-primary hover:underline">
                Script Library
              </Link>{' '}
              — ready-to-run PowerShell scripts
            </li>
            <li>
              <Link href="/news" className="text-primary hover:underline">
                News
              </Link>{' '}
              — security alerts and Microsoft announcements
            </li>
            <li>
              <Link href="/topics" className="text-primary hover:underline">
                All Topics
              </Link>{' '}
              — browse by product or technology
            </li>
          </ul>
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-85"
          >
            Back to home
          </Link>
        </div>
      </Container>
    </div>
  )
}
