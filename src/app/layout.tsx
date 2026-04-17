import GoogleAnalytics from '@/components/GoogleAnalytics'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { analyticsEnabled, adsenseScriptEnabled, ADSENSE_PUBLISHER_ID, CONSENT_DEFAULTS } from '@/lib/consent'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const SITE_NAME = 'AdminSignal'
const SITE_URL = 'https://www.adminsignal.com'
const SITE_DESCRIPTION =
  'Production-tested guides, PowerShell scripts, and analysis for enterprise sysadmins. Written by a practitioner with 12+ years managing Windows fleets, Microsoft Intune tenants, and Active Directory environments across finance, logistics, and professional services.'
const OG_IMAGE = `${SITE_URL}/og-default.png`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: `${SITE_NAME} — Practitioner-Focused Content for Sysadmins`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'sysadmin',
    'Microsoft Intune',
    'PowerShell',
    'Windows Server',
    'endpoint management',
    'IT engineering',
    'Active Directory',
    'Microsoft 365',
    'Intune tutorials',
    'Windows admin guides',
    'enterprise IT',
    'Windows 11',
    'Autopilot',
    'Entra ID',
    'Group Policy',
    'Patch Tuesday',
    'endpoint security',
    'CIS benchmark',
    'LAPS',
    'MDM',
    'zero-touch deployment',
  ],
  authors: [
    {
      name: 'Jack',
      url: `${SITE_URL}/about`,
    },
  ],
  creator: 'Jack',
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: `${SITE_NAME} — Practitioner-Focused Content for Sysadmins`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'AdminSignal — Practitioner-Focused Guides for Enterprise Sysadmins',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@adminsignal',
    creator: '@adminsignal',
    title: `${SITE_NAME} — Practitioner-Focused Content for Sysadmins`,
    description:
      'Production-tested guides, PowerShell scripts, and analysis for Windows admins and endpoint engineers. 12+ years enterprise experience, no lab theory.',
    images: [OG_IMAGE],
  },
  category: 'technology',
  other: {
    'google-adsense-account': 'ca-pub-5563142788194204',
  },
  alternates: {
    types: {
      'application/rss+xml': [{ url: '/rss.xml', title: 'AdminSignal RSS Feed' }],
    },
  },
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    apple: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <head>
        {adsenseScriptEnabled && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="flex min-h-full flex-col antialiased">
        {analyticsEnabled && (
          <Script id="consent-defaults" strategy="beforeInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('consent', 'default', ${JSON.stringify(CONSENT_DEFAULTS)});
          `}</Script>
        )}
        <GoogleAnalytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}