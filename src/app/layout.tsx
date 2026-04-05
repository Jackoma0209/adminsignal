import AdSenseScript from '@/components/AdSenseScript'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { analyticsEnabled, CONSENT_DEFAULTS } from '@/lib/consent'

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
    default: 'AdminSignal — Intelligence for the Modern Sysadmin',
    template: '%s | AdminSignal',
  },
  description:
    'Trusted guides, scripts, and analysis for endpoint specialists, Windows admins, and IT engineers. The signal source for IT professionals.',
  keywords: [
    'sysadmin',
    'Microsoft Intune',
    'PowerShell',
    'Windows Server',
    'endpoint management',
    'IT engineering',
    'Active Directory',
    'Microsoft 365',
  ],
  openGraph: {
    siteName: 'AdminSignal',
    type: 'website',
  },
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
      <body className="flex min-h-full flex-col antialiased">
        {analyticsEnabled && (
          <Script id="consent-defaults" strategy="beforeInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('consent', 'default', ${JSON.stringify(CONSENT_DEFAULTS)});
          `}</Script>
        )}
        <AdSenseScript />
        <GoogleAnalytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}