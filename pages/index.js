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

function Home({ home, books, preOrderAvailable }) {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.katebromley.com" />
      </Head>

      {books.map((book, index) => {
        // alternate order of book & text, starting with the book being on the left
        const bookColClasses =
          index % 2 === 0
            ? 'text-center row-start-1 col-start-1 md:text-left' // book is on the left
            : 'text-center row-start-1 col-start-1 md:row-auto md:col-auto md:text-right'; // book is on the right

        return (
          <Section backdrop={{ color: 'gray', position: index % 2 === 0 ? 'left' : 'right' }}>
            <div className="grid md:grid-cols-2 gap-10 md:gap-6">
              <div className="flex justify-center items-center">
                <div>
                  {index === 0 && (
                    <h5 className="h5 text-primary-main uppercase mb-10">
                      {isReleased(book.release_date) ? 'Latest Release' : 'Coming Soon'}
                    </h5>
                  )}
                  {index === 1 && preOrderAvailable && isReleased(book.release_date) && (
                    <h5 className="h5 text-primary-main uppercase mb-10">Latest Release</h5>
                  )}
                  <h2 className="h2 mb-4">
                    <Link href={`/books/${book.slug}`}>{book.title}</Link>
                  </h2>
                  <p className="body2 pb-10 md:w-10/12">{book.tagline}</p>

                  <Button href={`/books/${book.slug}`} className="mr-4" primary>
                    Learn More
                  </Button>
                </div>
              </div>

              <div className={bookColClasses}>
                <Link href={`/books/${book.slug}`}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${book.cover_image.url}`}
                    alt={`Cover Art: ${book.title}`}
                    width="384"
                    height={calcImageHeight(384, book.cover_image.width, book.cover_image.height)}
                    quality="90"
                  />
                </Link>
              </div>
            </div>
          </Section>
        );
      })}

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
  books: PropTypes.arrayOf(
    PropTypes.shape({
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
  ).isRequired,
  preOrderAvailable: PropTypes.bool,
};

Home.defaultProps = {
  preOrderAvailable: false,
};

export const getStaticProps = async () => {
  const [home, books] = await Promise.all([
    fetchAPI(`/home`),
    fetchAPI(`/books`).catch(() => null), // todo, only "featured books"
  ]);
  const sortedBooks = books.sort(
    (a, b) => Number(new Date(b.release_date)) - Number(new Date(a.release_date)),
  );
  return { props: { home, books: sortedBooks } };
};

export default Home;
