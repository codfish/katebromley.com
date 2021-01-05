import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import Section from '../components/Section';
import { fetchAPI } from '../lib/api';
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
        <meta name="description" content="More about Kate Bromley" />
      </Head>

      <PageHeader>Biography</PageHeader>

      <Section noBorder>
        <div className="grid md:grid-cols-2 gap-10 md:gap-6">
          <div className="text-center md:text-left">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${biography.headshot.url}`}
              alt="Kate Bromley Author Headshot"
              width="384"
              height={calcImageHeight(384, biography.headshot.width, biography.headshot.height)}
            />
          </div>

          <div className="flex justify-center items-center">
            <div>
              <h5 className="h5 text-primary-main uppercase mb-10">{biography.greeting_header}</h5>
              <p className="body1 mb-4">{biography.greeting}</p>
              <p className="body2">{biography.bio}</p>
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
              <React.Fragment key={faq.id}>
                <h6 className="text1 mb-4 font-semibold">{faq.question}</h6>
                <ReactMarkdown className="body3 mb-14">{faq.answer}</ReactMarkdown>
              </React.Fragment>
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
    greeting_header: PropTypes.string,
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
      id: PropTypes.number.isRequired,
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export const getStaticProps = async () => {
  const [biography, faqs] = await Promise.all([
    fetchAPI(`/biography`),
    fetchAPI(`/faqs?featured=true&_sort=order`),
  ]);
  return { props: { biography, faqs } };
};

export default Biography;
