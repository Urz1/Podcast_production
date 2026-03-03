import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Instrument_Sans, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SkipLink } from '@/components/layout/skip-link'
import { GlobalHeader } from '@/components/layout/global-header'
import { GlobalFooter } from '@/components/layout/global-footer'
import { getContentAdapter } from '@/lib/adapters'
import { NowPlaying } from '@/components/ui/now-playing'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'Unshakable Base | Building Foundations That Last',
    template: '%s | Unshakable Base',
  },
  description: 'Weekly conversations with leaders, entrepreneurs, and thinkers on building resilient careers, organizations, and lives in an uncertain world.',
  keywords: ['podcast', 'leadership', 'entrepreneurship', 'resilience', 'personal growth', 'business'],
  authors: [{ name: 'Unshakable Base' }],
  creator: 'Unshakable Base',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://unshakablebase.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Unshakable Base',
    title: 'Unshakable Base | Building Foundations That Last',
    description: 'Weekly conversations with leaders, entrepreneurs, and thinkers on building resilient careers, organizations, and lives.',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Unshakable Base Podcast',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unshakable Base | Building Foundations That Last',
    description: 'Weekly conversations on building resilient careers, organizations, and lives.',
    images: ['/images/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f3ef' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1814' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const adapter = getContentAdapter()
  const show = await adapter.show.getShowInfo()

  return (
    <html lang="en" suppressHydrationWarning className={`${playfairDisplay.variable} ${instrumentSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SkipLink />
          <div className="flex min-h-screen flex-col">
            <GlobalHeader platformLinks={show.platformLinks} />
            <main id="main-content" className="flex-1 pt-20 pb-24">
              {children}
            </main>
            <GlobalFooter platformLinks={show.platformLinks} />
          </div>
          <NowPlaying />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
