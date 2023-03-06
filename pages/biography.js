import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Head from 'next/head';
import Section from '../components/Section';
import contentful, { transformAuthor, transformFaq } from '../lib/contentful';
import { calcImageHeight } from '../lib/utils';
import SubscribeSection from '../components/SubscribeSection';
import SocialSection from '../components/SocialSection';
import PageHeader from '../components/PageHeader';
import Divider from '../components/Divider';

function Biography({ biography, faqs }) {
  return (
    <>
      <Head>
        <title>About Kate Bromley</title>
        <meta
          name="description"
          content="I'm a writer of romantic comedies and contemporary romance. I live in New York City with my husband, son, and my somewhat excessive collection of romance novels."
        />
        <link rel="canonical" href="https://www.katebromley.com/biography" />
      </Head>

      <PageHeader>About Kate</PageHeader>

      <Section noBorder>
        <div className="grid md:grid-cols-2 gap-10 md:gap-6">
          <div className="text-center md:text-left">
            <Image
              src={biography.headshot.url}
              alt="Kate Bromley Author Headshot"
              width="384"
              height={calcImageHeight(384, biography.headshot.width, biography.headshot.height)}
            />
          </div>

          <div className="flex justify-center items-center">
            <div>
              <p className="body2" dangerouslySetInnerHTML={{
                __html: biography.bio,
              }} />
            </div>
          </div>
        </div>
      </Section>

      <Divider className="my-6" />

      {faqs && (
        <Section noBorder>
          <div className="max-w-prose mx-auto">
            <h5 className="h5 text-primary-main uppercase mb-10">Frequently Asked Questions</h5>

            {faqs.map(faq => (
              <div key={faq.id}>
                <h6 className="text1 mb-4 font-semibold">{faq.question}</h6>
                <p className="body3 mb-14" dangerouslySetInnerHTML={{
                  __html: faq.answer,
                }}/>
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

Biography.propTypes = {
  biography: PropTypes.shape({
    greetingHeader: PropTypes.string,
    greeting: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    headshot: PropTypes.shape({
      url: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  faqs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export const getStaticProps = async () => {
  const [biography, faqs] = await Promise.all([
    contentful.getEntries({
      content_type: 'author',
      'fields.slug': 'kate-bromley',
    })
    .then(entries => transformAuthor(entries.items[0])),
    contentful.getEntries({
      content_type: 'faq',
      'fields.biography': true,
      order: 'fields.order',
    })
      .then(entries => entries.items.map(transformFaq)),
  ]);

  return { props: { biography, faqs } };
};

export default Biography;
