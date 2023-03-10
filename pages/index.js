import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Head from 'next/head';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Section from '../components/Section';
import SubscribeSection from '../components/SubscribeSection';
import SocialSection from '../components/SocialSection';
import Link from '../components/Link';
import Button from '../components/Button';
import { formatDateStr, isReleased, calcImageHeight } from '../lib/utils';
import { fetchKateBromley, fetchBooks } from '../lib/contentful';

export const getStaticProps = async () => {
  const [aboutKate, books] = await Promise.all([
    fetchKateBromley(),
    fetchBooks({ 'fields.featuredBook': true }),
  ])
  .catch(err => console.log(err));

  return { props: { aboutKate, books } };
};

function Home({ aboutKate, books, preOrderAvailable }) {
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
        const isPreRelease = !isReleased(book.releaseDate);

        return (
          <Section backdrop={{ color: 'gray', position: index % 2 === 0 ? 'left' : 'right' }} key={book.slug}>
            <div className="grid md:grid-cols-2 gap-10 md:gap-6">
              <div className="flex justify-center items-center">
                <div>
                  {index === 0 && (
                    <h5 className="h5 text-primary-main uppercase mb-10">
                      {isPreRelease ? `Coming ${formatDateStr(book.releaseDate)}` : 'Latest Release'}
                    </h5>
                  )}
                  {index === 1 && preOrderAvailable && !isPreRelease && (
                    <h5 className="h5 text-primary-main uppercase mb-10">Latest Release</h5>
                  )}
                  <h2 className="h2 mb-4">
                    <Link href={`/books/${book.slug}`} className="hover:text-secondary-dark">{book.title}</Link>
                  </h2>
                  <p className="body2 pb-10 md:w-10/12">{book.tagline}</p>

                  {index === 0 && (
                    <Button href={`/books/${book.slug}`} className="mr-4" primary>
                      {isPreRelease ? 'Pre-order Now' : 'Buy Now'}
                    </Button>
                  )}

                  {index !== 0 && (
                    <Link href="/biography" className="cta-link link block">
                      {isPreRelease ? 'Pre-order Now' : 'Buy Now'}
                    </Link>
                  )}
                </div>
              </div>

              <div className={bookColClasses}>
                <Link href={`/books/${book.slug}`}>
                  <Image
                    src={`${book.coverImage.url}`}
                    alt={`Cover Art: ${book.title}`}
                    className="inline-block"
                    width="384"
                    height={calcImageHeight(384, book.coverImage.width, book.coverImage.height)}
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
              src={`${aboutKate.headshot.url}`}
              alt="Kate Bromley Author Headshot"
              width="384"
              height={calcImageHeight(384, aboutKate.headshot.width, aboutKate.headshot.height)}
            />
          </div>

          <div className="flex items-center">
            <div>
              <h2 className="h2 lg:h1">About Kate</h2>

              {aboutKate.bio && <div className="body2 mt-4">{documentToReactComponents(aboutKate.bio)}</div>}

              <Link href="/biography" className="cta-link link block mt-11">
                More about me
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
  aboutKate: PropTypes.shape({
    greeting_header: PropTypes.string,
    greeting: PropTypes.string.isRequired,
    bio: PropTypes.object.isRequired,
    headshot: PropTypes.shape({
      url: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      coverImage: PropTypes.shape({
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

export default Home;
