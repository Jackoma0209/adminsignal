import Script from 'next/script'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
     <body className="flex min-h-full flex-col antialiased">
  <Script
    id="adsense-script"
    strategy="beforeInteractive"
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5563142788194204"
    crossOrigin="anonymous"
  />
  <GoogleAnalytics />
  <Header />
  <main className="flex-1">{children}</main>
  <Footer />
</body>
    </html>
  )
}
