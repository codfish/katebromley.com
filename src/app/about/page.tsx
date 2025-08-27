import React from 'react';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Section from '../../components/Section';
import SubscribeSection from '../../components/SubscribeSection';
import SocialSection from '../../components/SocialSection';
import PageHeader from '../../components/PageHeader';
import Divider from '../../components/Divider';
import { fetchKateBromley, fetchFaqs } from '../../lib/contentful';
import type { AboutKate, FAQ } from '../../lib/contentful';
import { calcImageHeight } from '../../lib/utils';
import type { Metadata } from 'next';

export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About Kate Bromley',
    description:
      "Kate is a writer of romantic comedies and contemporary romance. She lives on the east coast with her husband, sons, and her somewhat excessive collection of romance novels. (It's not hoarding if it's books, right?)",
    alternates: { canonical: 'https://www.katebromley.com/about' },
    openGraph: {
      title: 'About Kate Bromley',
      description:
        "Kate is a writer of romantic comedies and contemporary romance. She lives on the east coast with her husband, sons, and her somewhat excessive collection of romance novels.",
      url: 'https://www.katebromley.com/about',
      type: 'profile',
      siteName: 'Kate Bromley Novels',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary',
      title: 'About Kate Bromley',
      description:
        "Kate is a writer of romantic comedies and contemporary romance.",
    },
  };
}

async function getData(): Promise<{ aboutKate: AboutKate; faqs: FAQ[] }> {
  const [aboutKate, faqs] = await Promise.all([
    fetchKateBromley(),
    fetchFaqs({ 'fields.biography': true }),
  ]);
  return { aboutKate, faqs };
}

export default async function AboutPage() {
  const { aboutKate, faqs } = await getData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Kate Bromley',
            url: 'https://www.katebromley.com/about',
          }),
        }}
      />
      <PageHeader>About Kate</PageHeader>

      <Section noBorder maxWidth="lg">
        <div className="grid md:grid-cols-2 gap-10 md:gap-6">
          <div className="text-center md:text-left">
            <Image
              src={aboutKate.headshot.url}
              alt="Kate Bromley Author Headshot"
              width={384}
              height={calcImageHeight(384, aboutKate.headshot.width, aboutKate.headshot.height)}
            />
          </div>

          <div className="flex justify-center items-center">
            <div className="body2">
              {documentToReactComponents(aboutKate.bio)}
            </div>
          </div>
        </div>
      </Section>

      <Divider className="my-6" />

      {faqs && (
        <Section noBorder>
          <div className="max-w-prose mx-auto">
            <h5 className="h5 text-pink uppercase mb-10">Frequently Asked Questions</h5>
            {faqs.map(faq => (
              <div key={faq.id}>
                <h6 className="text1 mb-4 font-semibold">{faq.question}</h6>
                <div className="body3 mb-14">{documentToReactComponents(faq.answer)}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      <SubscribeSection />
      <SocialSection />
    </>
  );
}


