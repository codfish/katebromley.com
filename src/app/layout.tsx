import '@/styles/app.css';
import type { Metadata, Viewport } from 'next';
import React, { PropsWithChildren } from 'react';

import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import Header from '@/components/Header';

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

export default function RootLayout({ children }: PropsWithChildren<Record<string, never>>) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
