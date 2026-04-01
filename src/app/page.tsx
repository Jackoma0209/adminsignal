import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.adminsignal.com' },
  openGraph: {
    url: 'https://www.adminsignal.com',
    type: 'website',
  },
}

import ValuePropSection from '@/components/sections/ValuePropSection'
import TrustStripSection from '@/components/sections/TrustStripSection'
import FeaturedSignalsSection from '@/components/sections/FeaturedSignalsSection'
import FeaturedGuidesSection from '@/components/sections/FeaturedGuidesSection'
import FeaturedScriptsSection from '@/components/sections/FeaturedScriptsSection'
import TopicHubsSection from '@/components/sections/TopicHubsSection'
import NewsletterSection from '@/components/sections/NewsletterSection'
import RecommendedToolsSection from '@/components/sections/RecommendedToolsSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStripSection />
      <ValuePropSection />
      <FeaturedSignalsSection />
      <FeaturedGuidesSection />
      <FeaturedScriptsSection />
      <TopicHubsSection />
      <NewsletterSection />
      <RecommendedToolsSection />
    </>
  )
}
