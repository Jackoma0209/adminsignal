import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import { ShieldCheck } from 'lucide-react'
import HeroSection from '@/components/sections/HeroSection'
import ValuePropSection from '@/components/sections/ValuePropSection'
import TrustStripSection from '@/components/sections/TrustStripSection'
import FeaturedSignalsSection from '@/components/sections/FeaturedSignalsSection'
import FeaturedGuidesSection from '@/components/sections/FeaturedGuidesSection'
import FeaturedScriptsSection from '@/components/sections/FeaturedScriptsSection'
import NewsletterSection from '@/components/sections/NewsletterSection'
import TopicHubsSection from '@/components/sections/TopicHubsSection'
import RecommendedToolsSection from '@/components/sections/RecommendedToolsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import AuthorBioSection from '@/components/sections/AuthorBioSection'
import StructuredData from '@/components/StructuredData'
import { organizationSchema, personSchema, webPageSchema, websiteSchema } from '@/lib/schema'
import { primaryAuthor } from '@/data/authors'

const homeTitle = 'AdminSignal — Practitioner-Focused Content for Sysadmins'
const homeDescription =
  'In-depth guides, scripts, and analysis for endpoint specialists, Windows admins, and IT engineers. Written by a practitioner with 12+ years of enterprise Windows and Intune experience.'
const homeUrl = 'https://www.adminsignal.com'

export const metadata: Metadata = {
  alternates: { canonical: homeUrl },
  description: homeDescription,
  openGraph: {
    url: homeUrl,
    type: 'website',
    title: homeTitle,
    description: homeDescription,
  },
}

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={organizationSchema({
          description: homeDescription,
        })}
      />
      <StructuredData
        data={websiteSchema({
          description: homeDescription,
        })}
      />
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
          jobTitle: primaryAuthor.role,
          description: primaryAuthor.bio,
          sameAs: primaryAuthor.linkedIn ? [primaryAuthor.linkedIn] : undefined,
        })}
      />

      <HeroSection />
      <TrustStripSection />
      <ValuePropSection />
      <FeaturedSignalsSection />
      <FeaturedGuidesSection />
      <FeaturedScriptsSection />
      <NewsletterSection />
      <TopicHubsSection />
      <RecommendedToolsSection />
      <TestimonialsSection />
      <AuthorBioSection />

      {/* ── Site-wide trust strip ─────────────────────────────────────── */}
      <div className="border-t border-border bg-surface/30 py-6">
        <Container>
          <div className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4">
            <ShieldCheck className="h-4 w-4 shrink-0 text-primary/60" aria-hidden="true" />
            <p className="text-xs text-muted/60">
              Last site-wide review:{' '}
              <span className="font-medium text-muted/80">
                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <span className="mx-2 hidden sm:inline" aria-hidden="true">·</span>
              <br className="sm:hidden" />
              All content written and tested in production environments by a senior enterprise sysadmin.
            </p>
          </div>
        </Container>
      </div>
    </>
  )
}
