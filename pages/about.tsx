import React from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Section from '../components/Section';
import { fetchKateBromley, fetchFaqs } from '../lib/contentful';
import { calcImageHeight } from '../lib/utils';
import SubscribeSection from '../components/SubscribeSection';
import SocialSection from '../components/SocialSection';
import PageHeader from '../components/PageHeader';
import Divider from '../components/Divider';
import { AboutKate, FAQ } from '../lib/contentful';

interface AboutProps {
  aboutKate: AboutKate;
  faqs: FAQ[];
}

function About({ aboutKate, faqs }: AboutProps) {
  return (
    <>
      <Head>
        <title>About Kate Bromley</title>
        <meta
          name="description"
          content="I'm a writer of romantic comedies and contemporary romance. I live in New York City with my husband, son, and my somewhat excessive collection of romance novels."
        />
        <link rel="canonical" href="https://www.katebromley.com/about" />
      </Head>

      <PageHeader>About Kate</PageHeader>

      <Section noBorder maxWidth="lg">
        <div className="grid md:grid-cols-2 gap-10 md:gap-6">
          <div className="text-center md:text-left">
            <Image
              src={aboutKate.headshot.url}
              alt="Kate Bromley Author Headshot"
              width="384"
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

export const getStaticProps: GetStaticProps = async () => {
  const [aboutKate, faqs] = await Promise.all([
    fetchKateBromley(),
    fetchFaqs({ 'fields.biography': true }),
  ]);

  return { props: { aboutKate, faqs } };
};

export default About;
