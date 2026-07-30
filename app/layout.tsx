import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import ViewportInsetsProvider from '@/components/ViewportInsetsProvider'
import ReadAloudToolbar from '@/components/ReadAloudToolbar'
import { SITE_NAME, SITE_URL } from '@/lib/site'

// Both themes are dark, so there is no system preference to consult — only the
// stored green/blue choice, applied before first paint to avoid a colour flash.
const themeInitScript = `(function(){try{var t=localStorage.getItem('wonders-theme');document.documentElement.classList.toggle('theme-ocean',t==='ocean');}catch(e){}})();`

/**
 * Structured data describing what this page actually is: a free reading
 * application for the World English Bible, plus the public-domain work itself.
 */
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description:
        'Read the complete Old and New Testament from the World English Bible with search, read-aloud and a guided tour of key events.',
      inLanguage: 'en',
      isFamilyFriendly: true,
    },
    {
      '@type': 'WebApplication',
      '@id': `${SITE_URL}/#app`,
      url: SITE_URL,
      name: SITE_NAME,
      applicationCategory: 'ReferenceApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: [
        'Read all 66 books and 1,189 chapters',
        'Search across the full text',
        'Listen with browser text-to-speech',
        'Green and blue reading themes',
        'Guided tour comparing how Matthew, Mark, Luke, John and Paul describe the same events',
      ],
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'Book',
      '@id': `${SITE_URL}/#book`,
      name: 'World English Bible',
      alternateName: 'WEB',
      bookEdition: 'World English Bible',
      inLanguage: 'en',
      numberOfPages: 1189,
      isAccessibleForFree: true,
      license: 'https://creativecommons.org/publicdomain/zero/1.0/',
      genre: 'Religious text',
      about: 'Old Testament and New Testament scripture',
      mainEntityOfPage: { '@id': `${SITE_URL}/#website` },
    },
  ],
}
// import PrayerChatWidget from '../components/PrayerChatWidget'

export const metadata: Metadata = {
  title: 'Wonders and Hope — the Bible’s miracles, passage by passage',
  description:
    "178 wonders from the World English Bible, each with a short card and the passage open beside it. Read the whole Bible too — 66 books, 1,189 chapters.",
  keywords: ['Bible', 'miracles', 'wonders', 'Old Testament', 'New Testament', 'Scripture', 'World English Bible', 'Gospel', 'hope'],
  authors: [{ name: 'raimonvibe' }],
  creator: 'raimonvibe',
  publisher: 'raimonvibe',
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  category: 'reference',
  alternates: {
    canonical: '/',
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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Wonders and Hope — the Bible’s miracles, passage by passage',
    description:
      "178 wonders from the World English Bible, each with a short card and the passage open beside it. Read the whole Bible too — 66 books, 1,189 chapters.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Wonders and Hope — a green Bible beside the words “178 moments when the impossible gave way”',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wonders and Hope — the Bible’s miracles, passage by passage',
    description:
      "178 wonders from the World English Bible, each with a short card and the passage open beside it. Read the whole Bible too — 66 books, 1,189 chapters.",
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Wonders and Hope',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  // Lets the page extend under the iPhone notch / home-indicator safe areas
  // instead of the browser reserving that strip and showing its own chrome
  // color (typically white) there. The CSS already reads env(safe-area-inset-*)
  // for the tour panel and listen button, but those resolve to 0 without this.
  viewportFit: 'cover',
  themeColor: '#163d2f',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <ViewportInsetsProvider />
        <main id="main-content" className="tour-safe-inset">
          <ThemeProvider>{children}</ThemeProvider>
        </main>
        <ReadAloudToolbar />
        {/* <PrayerChatWidget /> */}
      </body>
    </html>
  )
}
