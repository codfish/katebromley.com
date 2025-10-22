import '@/styles/app.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import type { PropsWithChildren } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { WebVitals } from './_components/web-vitals';

export const metadata: Metadata = {
  title: 'Kate Bromley',
  description:
    'Kate Bromley is the rom-com author of In My Tudor Era, Talk Bookish to Me, Here for the Drama, and Ciao For Now.',
  icons: [{ rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' }],
  robots: process.env.VERCEL_ENV !== 'production' ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: '#ED6D90',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <SpeedInsights />
        <Analytics />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        <WebVitals />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
