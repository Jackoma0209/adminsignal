import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import { ShieldCheck } from 'lucide-react'
import HeroSection from '@/components/sections/HeroSection'
import ValuePropSection from '@/components/sections/ValuePropSection'
import TrustStripSection from '@/components/sections/TrustStripSection'
import FeaturedSignalsSection from '@/components/sections/FeaturedSignalsSection'
import FailureStateSection from '@/components/sections/FailureStateSection'
import FeaturedGuidesSection from '@/components/sections/FeaturedGuidesSection'
import NewsletterSection from '@/components/sections/NewsletterSection'
import TopicHubsSection from '@/components/sections/TopicHubsSection'
import AuthorBioSection from '@/components/sections/AuthorBioSection'
import StructuredData from '@/components/StructuredData'
import { organizationSchema, personSchema, webPageSchema, websiteSchema } from '@/lib/schema'
import { primaryAuthor } from '@/data/authors'

const homeTitle = 'AdminSignal — Practical Microsoft Administration Guidance'
const homeDescription =
  'Source-backed guides and analysis for endpoint specialists, Windows administrators, Microsoft Intune administrators, PowerShell users, and enterprise IT engineers.'
const homeUrl = 'https://www.adminsignal.com'
const authorUrl = `${homeUrl}/about#jack`
const ogImage = `${homeUrl}/og-default.png`

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  alternates: { canonical: homeUrl },
  description: homeDescription,
  openGraph: {
    url: homeUrl,
    type: 'website',
    siteName: 'AdminSignal',
    locale: 'en_US',
    title: homeTitle,
    description: homeDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'AdminSignal technical administration guidance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: homeTitle,
    description: homeDescription,
    images: [ogImage],
  },
}

export default function HomePage() {
  return (
    <>
      <StructuredData data={organizationSchema({ description: homeDescription })} />
      <StructuredData data={websiteSchema({ description: homeDescription })} />
      <StructuredData
        data={webPageSchema({
          title: homeTitle,
          description: homeDescription,
          url: homeUrl,
        })}
      />
      <StructuredData
        data={personSchema({
          name: primaryAuthor.name,
          url: authorUrl,
          jobTitle: primaryAuthor.role,
          description: primaryAuthor.bio,
          sameAs: [primaryAuthor.linkedIn, primaryAuthor.github].filter(
            (value): value is string => Boolean(value),
          ),
        })}
      />

      <HeroSection />
      <TrustStripSection />
      <ValuePropSection />
      <FeaturedSignalsSection />
      <FailureStateSection />
      <FeaturedGuidesSection />
      <NewsletterSection />
      <TopicHubsSection />
      <AuthorBioSection />

      <div className="border-t border-border bg-surface/30 py-6">
        <Container>
          <div className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4">
            <ShieldCheck className="h-4 w-4 shrink-0 text-primary/60" aria-hidden="true" />
            <p className="max-w-3xl text-xs leading-relaxed text-muted/70">
              Editorial updates are recorded on the affected article. AdminSignal does not use an automatically advancing site-wide review date as evidence that every page has been rechecked.
            </p>
          </div>
        </Container>
      </div>
    </>
  )
}
