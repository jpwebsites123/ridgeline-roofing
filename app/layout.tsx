import type { ReactNode } from 'react';
import { Big_Shoulders_Display, Inter, IBM_Plex_Mono } from 'next/font/google';

const bigShoulders = Big_Shoulders_Display({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-big-shoulders',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${bigShoulders.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
