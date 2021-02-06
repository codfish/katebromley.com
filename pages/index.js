import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Head from 'next/head';
import { fetchAPI } from '../lib/api';
import Section from '../components/Section';
import SubscribeSection from '../components/SubscribeSection';
import SocialSection from '../components/SocialSection';
import Link from '../components/Link';
import Button from '../components/Button';
import { isReleased, calcImageHeight } from '../lib/utils';

function Home({ home, featured }) {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.katebromley.com" />
      </Head>

      <Section backdrop={{ color: 'primary', position: 'left' }}>
        <div className="grid md:grid-cols-2 gap-10 md:gap-6">
          <div className="text-center md:text-left">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${home.headshot.url}`}
              alt="Kate Bromley Author Headshot"
              width="384"
              height={calcImageHeight(384, home.headshot.width, home.headshot.height)}
            />
          </div>

          <div className="flex items-center">
            <div>
              <h5 className="h5 text-primary-main uppercase mb-6">{home.greeting_header}</h5>
              <h1
                className="h2 lg:h1"
                // eslint-disable-next-line
                dangerouslySetInnerHTML={{
                  __html: home.greeting.replace('\n', '<br />'),
                }}
              />
              {home.short_bio && <p className="body2 mt-4">{home.short_bio}</p>}

              <Link href="/biography" className="cta-link link block mt-11">
                Learn more about me
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {featured && (
        <Section backdrop={{ color: 'gray', position: 'right' }}>
          <div className="grid md:grid-cols-2 gap-10 md:gap-6">
            <div className="flex justify-center items-center">
              <div>
                <h5 className="h5 text-primary-main uppercase mb-10">
                  {isReleased(featured.release_date) ? 'Latest Release' : 'Coming Soon'}
                </h5>
                <h2 className="h2 mb-4">
                  <Link href={`/books/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <p className="body2 pb-10 md:w-10/12">{featured.tagline}</p>

                <Button href={`/books/${featured.slug}`} className="mr-4" primary>
                  Learn More
                </Button>

                {/* <Button href="/books">See All Books</Button> */}
              </div>
            </div>

            <div className="text-center row-start-1 col-start-1 md:row-auto md:col-auto md:text-right">
              <Link href={`/books/${featured.slug}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${featured.cover_image.url}`}
                  alt={`Cover Art: ${featured.title}`}
                  width="384"
                  height={calcImageHeight(
                    384,
                    featured.cover_image.width,
                    featured.cover_image.height,
                  )}
                  quality="90"
                />
              </Link>
            </div>
          </div>
        </Section>
      )}

      <SubscribeSection />

      <SocialSection />
    </>
  );
}

Home.propTypes = {
  home: PropTypes.shape({
    greeting_header: PropTypes.string,
    greeting: PropTypes.string.isRequired,
    short_bio: PropTypes.string,
    headshot: PropTypes.shape({
      url: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  featured: PropTypes.shape({
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cover_image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
    tagline: PropTypes.string.isRequired,
  }),
};

Home.defaultProps = {
  featured: null,
};

export const getStaticProps = async () => {
  const [home, featured] = await Promise.all([
    fetchAPI(`/home`),
    fetchAPI(`/books/featured`).catch(() => null),
  ]);
  return { props: { home, featured } };
};

export default Home;
