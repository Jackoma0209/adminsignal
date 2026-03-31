import type { Metadata } from 'next'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'About AdminSignal',
  description:
    'AdminSignal is a technical resource for IT professionals managing Microsoft environments — Intune, Windows Server, PowerShell, and more.',
}

export default function AboutPage() {
  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">About</p>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            AdminSignal
          </h1>
          <div className="space-y-4 text-base leading-relaxed text-muted">
            <p>
              AdminSignal is a technical resource for IT professionals and sysadmins managing
              Microsoft environments — Intune, Windows Server, PowerShell, Entra ID, and beyond.
            </p>
            <p>
              Our goal is to provide clear, accurate, and actionable content: in-depth tutorials,
              ready-to-run scripts, honest product reviews, and timely security alerts — without the
              filler.
            </p>
            <p>
              This site is currently in early development. More content and features are on the way.
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
