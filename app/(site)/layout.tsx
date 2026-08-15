import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBar from '@/components/MobileBar';
import EstimateSection from '@/components/EstimateSection';
import ScrollFx from '@/components/ScrollFx';
import { SiteMediaProvider } from '@/components/SiteMediaProvider';

export const metadata: Metadata = {
  title: 'Ridgeline Roofing Co. | Roofing Built to Protect What Matters Most',
  description:
    'Professional roof replacement, repair, and inspection serving Hamilton, Burlington, Oakville & surrounding areas. Licensed, insured, and backed by a real workmanship warranty. Free estimates.',
  openGraph: {
    title: 'Ridgeline Roofing Co. | Roofing Built to Protect What Matters Most',
    description:
      'Professional roofing installation, replacement, and repair backed by quality craftsmanship, dependable service, and warranties you can trust.',
    type: 'website',
  },
  // Favicon is handled automatically by Next.js via app/icon.svg — no
  // manual `icons` entry needed here.
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RoofingContractor',
  name: 'Ridgeline Roofing Co.',
  description:
    'Residential and commercial roofing: replacement, repair, inspections, and emergency service.',
  areaServed: [
    'Hamilton, ON',
    'Burlington, ON',
    'Oakville, ON',
    'Ancaster, ON',
    'Stoney Creek, ON',
    'Grimsby, ON',
    'Brantford, ON',
    'Mississauga, ON',
  ],
  telephone: '+1-555-018-0192',
  priceRange: '$$',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;700;800;900&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SiteMediaProvider>
          <Header />
          {children}
          <EstimateSection />
          <Footer />
          <MobileBar />
          <ScrollFx />
        </SiteMediaProvider>
      </body>
    </html>
  );
}
