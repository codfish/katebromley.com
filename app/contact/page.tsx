import React from 'react';
import { FaInstagram, FaAmazon, FaGoodreads } from 'react-icons/fa';
import { SiLinktree } from 'react-icons/si';
import PageHeader from '../../components/PageHeader';
import Section from '../../components/Section';
import SubscribeSection from '../../components/SubscribeSection';
import Link from '../../components/Link';
import type { Metadata } from 'next';

export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contact Kate Bromley',
    description: 'Contact Kate Bromley',
    alternates: { canonical: 'https://www.katebromley.com/contact' },
    openGraph: {
      title: 'Contact Kate Bromley',
      description: 'Contact Kate Bromley',
      url: 'https://www.katebromley.com/contact',
      type: 'website',
      siteName: 'Kate Bromley Novels',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary',
      title: 'Contact Kate Bromley',
      description: 'Contact Kate Bromley',
    },
  };
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Kate Bromley',
            url: 'https://www.katebromley.com/contact',
          }),
        }}
      />
      <PageHeader>Contact</PageHeader>

      <Section noBorder maxWidth="lg">
        <div className="prose mx-auto text-center">
          <p className="text-body2 mb-4">
            For agent inquiries, contact{' '}
            <a
              href="https://www.marsallyonliteraryagency.com/the-agents/kevan-lyon/"
              className="link"
            >
              Kevan Lyon
            </a>{' '}
            at{' '}
            <a
              href="mailto:kevan@marsallyonliteraryagency.com"
              className="underline hover:no-underline"
            >
              Kevan@MarsalLyonLiteraryAgency.com
            </a>
            .
          </p>
          <p className="text-body2 mb-10">
            For publicity inquiries, contact{' '}
            <a href="https://www.linkedin.com/in/justineisha/" className="link">
              Justine Sha
            </a>{' '}
            at{' '}
            <a href="mailto:justine.sha@harpercollins.com" className="underline hover:no-underline">
              Justine.Sha@HarperCollins.com
            </a>.
          </p>

          <div className="flex flex-col justify-center text-center">
            <h5 className="h5 text-pink mb-6 uppercase">Follow along on social media</h5>
            <div className="flex items-center justify-center text-2xl">
              <Link href="https://www.instagram.com/katebromleywrites" className="mx-4">
                <FaInstagram className="hover:text-pink" />
              </Link>
              <Link href="https://www.amazon.com/Kate-Bromley/e/B08GYP6TNY" className="mx-4">
                <FaAmazon className="hover:text-pink" />
              </Link>
              <Link
                href="https://www.goodreads.com/author/show/20590705.Kate_Bromley"
                className="mx-4"
              >
                <FaGoodreads className="hover:text-pink" />
              </Link>
              <Link href="https://linktr.ee/katebromley" className="mx-4">
                <SiLinktree className="hover:text-pink size-5" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <SubscribeSection />
    </>
  );
}


