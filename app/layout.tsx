import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const displayFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const bodyFont = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

const siteUrl = process.env.APP_URL || 'https://www.millerz.co.zw';
const pageTitle = 'Millerz Technologies | Full-Stack & SEO Engineering';
const pageDescription =
  'Explore TreasurePal, CareerMatched, TrueVona, and Millerz Technologies—Next.js platforms built by Johannes Zemba with Prisma, SQLite, and technical SEO.';

export const viewport: Viewport = {
  themeColor: '#0a0d0b',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: pageTitle,
    template: '%s | Millerz Technologies',
  },
  description: pageDescription,
  keywords: [
    'Millerz Technologies',
    'Johannes Zemba',
    'TreasurePal',
    'CareerMatched',
    'TrueVona',
    'Next.js Developer Zimbabwe',
    'Prisma ORM SQLite',
    'Technical SEO Engineer Harare',
    'Full-Stack Web Engineering',
    'Mobile App Development Zimbabwe',
  ],
  authors: [{ name: 'Johannes Zemba', url: 'https://www.johanneszemba.co.zw' }],
  creator: 'Johannes Zemba',
  publisher: 'Millerz Technologies',
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
  openGraph: {
    type: 'website',
    locale: 'en_ZW',
    url: siteUrl,
    siteName: 'Millerz Technologies',
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: '/images/hero_millerz_studio_1795418087512.jpg',
        width: 1200,
        height: 630,
        alt: 'Millerz Technologies Engineering Studio in Harare, Zimbabwe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: ['/images/hero_millerz_studio_1795418087512.jpg'],
  },
  manifest: '/manifest.webmanifest',
};

const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.millerz.co.zw/#organization',
      name: 'Millerz Technologies',
      url: 'https://www.millerz.co.zw',
      logo: `${siteUrl}/images/millerz-logo.png`,
      description: pageDescription,
      founder: {
        '@id': 'https://www.johanneszemba.co.zw/#person',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Harare',
        addressCountry: 'ZW',
      },
      sameAs: [
        'https://www.treasurepal.co.zw',
        'https://www.careermatched.co.zw',
        'https://www.truevona.co.zw',
        'https://www.millerz.co.zw',
        'https://www.johanneszemba.co.zw',
      ],
    },
    {
      '@type': 'Person',
      '@id': 'https://www.johanneszemba.co.zw/#person',
      name: 'Johannes Zemba',
      jobTitle: 'Full-Stack Web Developer & SEO Engineer',
      url: 'https://www.johanneszemba.co.zw',
      worksFor: {
        '@id': 'https://www.millerz.co.zw/#organization',
      },
      knowsAbout: [
        'Next.js',
        'TypeScript',
        'Prisma ORM',
        'SQLite',
        'Technical SEO',
        'Schema.org JSON-LD',
        'React Native',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Millerz Technologies',
      publisher: {
        '@id': 'https://www.millerz.co.zw/#organization',
      },
      inLanguage: 'en-ZW',
    },
    {
      '@type': 'ItemList',
      name: 'Production Web Platforms by Millerz Technologies & Johannes Zemba',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'WebApplication',
            name: 'TreasurePal',
            url: 'https://www.treasurepal.co.zw',
            applicationCategory: 'RealEstateApplication',
            description:
              'Your trusted real estate partner — browse affordable housing, student accommodation, and commercial property listings across Zimbabwe.',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'WebApplication',
            name: 'CareerMatched',
            url: 'https://www.careermatched.co.zw',
            applicationCategory: 'BusinessApplication',
            description:
              'Find verified jobs, attachments, remote careers, OpenStreetMap businesses, and products in Zimbabwe.',
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'WebApplication',
            name: 'TrueVona',
            url: 'https://www.truevona.co.zw',
            applicationCategory: 'SocialNetworkingApplication',
            description:
              'Social platform for dating, communities, messaging, and entertainment in Zimbabwe.',
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'WebApplication',
            name: 'Millerz Technologies',
            url: 'https://www.millerz.co.zw',
            applicationCategory: 'DeveloperApplication',
            description:
              'Bespoke Next.js 16 Web Apps, iOS & Android Mobile Platforms, Cloud Infrastructure, and AI Quotation Solutions.',
          },
        },
        {
          '@type': 'ListItem',
          position: 5,
          item: {
            '@type': 'WebSite',
            name: 'Johannes Zemba Portfolio',
            url: 'https://www.johanneszemba.co.zw',
            description:
              'Portfolio of Johannes Zemba, Full-Stack Web Developer & SEO Engineer.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body className="min-h-screen bg-[#0a0d0b] text-[#f2f4f2] antialiased selection:bg-[#d4622a] selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
        {children}
      </body>
    </html>
  );
}
