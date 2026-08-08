import type { Metadata, Viewport } from 'next';
import { Sora, Inter } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/site';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SkipLink } from '@/components/layout/SkipLink';
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationSchema, localBusinessSchema } from '@/lib/seo/jsonld';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const viewport: Viewport = {
  themeColor: '#0A0E1A',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Marketing & Events in Jamaica`,
    template: `%s | ${SITE.name}`,
  },
  description:
    'Full-service marketing agency and corporate event production company in Kingston, Jamaica. Bespoke catering and brand activation for enterprise clients.',
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_JM',
    url: SITE.url,
  },
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-JM" className={`${sora.variable} ${inter.variable}`}>
      <body>
        <SkipLink />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
