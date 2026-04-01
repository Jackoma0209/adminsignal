import type { Metadata } from 'next'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Advertise',
  description:
    'Reach IT professionals, sysadmins, and endpoint specialists through AdminSignal.',
}

export default function AdvertisePage() {
  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Partnerships
          </p>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Advertise on AdminSignal
          </h1>
          <div className="space-y-4 text-base leading-relaxed text-muted">
            <p>
              AdminSignal reaches IT professionals, sysadmins, and endpoint specialists who manage
              Microsoft environments at scale — an audience actively evaluating tools, services, and
              vendors.
            </p>
            <p>
              We offer sponsored content, newsletter placements, and contextual advertising
              opportunities. All commercial content is clearly labelled in line with our{' '}
              <a href="/editorial-policy" className="text-primary underline underline-offset-2">
                editorial policy
              </a>
              .
            </p>
            <p>
              To discuss options, contact us at{' '}
              <a
                href="mailto:partnerships@adminsignal.com"
                className="text-primary underline underline-offset-2"
              >
                partnerships@adminsignal.com
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
