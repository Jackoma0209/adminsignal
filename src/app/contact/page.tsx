import type { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Jack, author of AdminSignal.',
}

export default function ContactPage() {
  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Contact
          </p>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get in Touch
          </h1>
          <div className="space-y-4 text-base leading-relaxed text-muted">
            <p>
              Have a question, a correction, a tip, or a proposal? I read everything sent my way.
            </p>
            <p>
              AdminSignal is independently operated by{' '}
              <Link href="/about" className="text-primary hover:underline">
                Jack
              </Link>
              , a Microsoft admin practitioner writing practical guides for enterprise sysadmins.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface p-6">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted/60">
                General
              </p>
              <p className="font-medium text-foreground">Questions &amp; feedback</p>
              <p className="mt-1 text-sm text-muted">
                General enquiries, topic requests, or anything else about the site.
              </p>
              <a
                href="mailto:hello@adminsignal.com"
                className="mt-3 block text-sm text-primary hover:underline"
              >
                hello@adminsignal.com
              </a>
            </div>

            <div className="rounded-lg border border-border bg-surface p-6">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted/60">
                Editorial
              </p>
              <p className="font-medium text-foreground">Article corrections &amp; tips</p>
              <p className="mt-1 text-sm text-muted">
                Found an error? Have a story lead? Let me know.
              </p>
              <a
                href="mailto:editorial@adminsignal.com"
                className="mt-3 block text-sm text-primary hover:underline"
              >
                editorial@adminsignal.com
              </a>
            </div>

            <div className="rounded-lg border border-border bg-surface p-6">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted/60">
                Privacy
              </p>
              <p className="font-medium text-foreground">Privacy &amp; cookie requests</p>
              <p className="mt-1 text-sm text-muted">
                Data access, deletion, or consent questions. Include &quot;Privacy Request&quot; in
                your message.
              </p>
              <a
                href="mailto:privacy@adminsignal.com"
                className="mt-3 block text-sm text-primary hover:underline"
              >
                privacy@adminsignal.com
              </a>
            </div>

            <div className="rounded-lg border border-border bg-surface p-6">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted/60">
                Partnerships
              </p>
              <p className="font-medium text-foreground">Advertising &amp; sponsorship</p>
              <p className="mt-1 text-sm text-muted">
                Interested in reaching IT professionals? See our{' '}
                <a href="/advertise" className="text-primary hover:underline">
                  advertise page
                </a>
                .
              </p>
              <a
                href="mailto:partnerships@adminsignal.com"
                className="mt-3 block text-sm text-primary hover:underline"
              >
                partnerships@adminsignal.com
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}