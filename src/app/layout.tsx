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

export const metadata: Metadata = {
  metadataBase: new URL('https://www.adminsignal.com'),
  title: {
    default: 'AdminSignal — Practitioner-Focused Content for Sysadmins',
    template: '%s | AdminSignal',
  },
  description:
    'In-depth guides, scripts, and analysis for endpoint specialists, Windows admins, and IT engineers. Written by a practitioner with 12+ years of enterprise Windows and Intune experience.',
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
  ],
  authors: [{ name: 'Jack', url: 'https://www.adminsignal.com/about' }],
  creator: 'Jack',
  publisher: 'AdminSignal',
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
    siteName: 'AdminSignal',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@adminsignal',
    creator: '@adminsignal',
    title: 'AdminSignal — Practitioner-Focused Content for Sysadmins',
    description:
      'In-depth guides, scripts, and analysis for Windows admins and endpoint engineers. Production-tested, not lab theory.',
  },
  category: 'technology',
  other: {
    'google-adsense-account': 'ca-pub-5563142788194204',
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