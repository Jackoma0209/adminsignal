import type { Metadata } from 'next'
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
    </>
  )
}
