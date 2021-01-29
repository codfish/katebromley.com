import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Image from 'next/image';
import { fetchAPI } from '../../lib/api';
import { isReleased, calcImageHeight } from '../../lib/utils';
import SubscribeSection from '../../components/SubscribeSection';
import SocialSection from '../../components/SocialSection';
import Divider from '../../components/Divider';
import Button from '../../components/Button';
import Link from '../../components/Link';
import Section from '../../components/Section';
import PageHeader from '../../components/PageHeader';

function Books({ books }) {
  const latestRelease = books[0];
  const secondBook = books[1] ?? null;
  const thirdBook = books[2] ?? null;

  return (
    <>
      <Head>
        <title>Books by Kate Bromley</title>
        <meta name="description" content="A list of books written by Kate Bromley" />
        <link rel="canonical" href="https://www.katebromley.com/books" />
      </Head>

      <PageHeader>Books</PageHeader>

      <Section noBorder>
        <div className="grid md:grid-cols-2 gap-10 md:gap-6">
          <div className="flex items-center">
            <div>
              <h5 className="h5 text-primary-main uppercase mb-10">
                {isReleased(latestRelease.release_date) ? 'Latest Release' : 'Coming Soon'}
              </h5>
              <h2 className="h2 mb-4">
                <Link href={`/books/${latestRelease.slug}`}>{latestRelease.title}</Link>
              </h2>
              <p className="body2 pb-10 md:w-10/12">{latestRelease.tagline}</p>

              <Button href={`/books/${latestRelease.slug}`} className="mr-4" primary>
                Learn More
              </Button>
            </div>
          </div>

          <div className="text-center row-start-1 col-start-1 md:row-auto md:col-auto md:text-right">
            <Link href={`/books/${latestRelease.slug}`}>
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${latestRelease.cover_image.url}`}
                alt={`Cover Art: ${latestRelease.title}`}
                width="384"
                height={calcImageHeight(
                  384,
                  latestRelease.cover_image.width,
                  latestRelease.cover_image.height,
                )}
                quality="90"
              />
            </Link>
          </div>
        </div>
      </Section>

      {secondBook && <Divider className="my-6" />}

      {books.length > 1 && (
        <Section maxWidth="md" noBorder>
          {secondBook && (
            <div className="grid md:grid-cols-2 gap-10 md:gap-6 mb-10">
              <div className="text-center md:text-left md:row-auto md:col-auto">
                <Link href={`/books/${secondBook.slug}`}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${secondBook.cover_image.url}`}
                    alt={`Cover Art: ${secondBook.title}`}
                    width="282"
                    height={calcImageHeight(
                      282,
                      secondBook.cover_image.width,
                      secondBook.cover_image.height,
                    )}
                    quality="90"
                  />
                </Link>
              </div>

              <div className="flex justify-center items-center">
                <div>
                  <h5 className="h5 uppercase mb-4">Book 2</h5>
                  <h3 className="h3 mb-4">
                    <Link href={`/books/${secondBook.slug}`}>{secondBook.title}</Link>
                  </h3>
                  <p className="body2 mb-8">{secondBook.tagline}</p>

                  <Link href={`/books/${secondBook.slug}`} className="cta-link link block">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          )}

          {thirdBook && (
            <div className="grid md:grid-cols-2 gap-10 md:gap-6">
              <div className="flex justify-center items-center">
                <div>
                  <h5 className="h5 uppercase mb-4">Book 3</h5>
                  <h3 className="h3 mb-4">
                    <Link href={`/books/${thirdBook.slug}`}>{thirdBook.title}</Link>
                  </h3>
                  <p className="body2 mb-8">{thirdBook.tagline}</p>

                  <Link href={`/books/${thirdBook.slug}`} className="cta-link link block">
                    Learn More
                  </Link>
                </div>
              </div>

              <div className="text-center md:text-right row-start-1 col-start-1 md:row-auto md:col-auto">
                <Link href={`/books/${thirdBook.slug}`}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${thirdBook.cover_image.url}`}
                    alt={`Cover Art: ${thirdBook.title}`}
                    width="282"
                    height={calcImageHeight(
                      282,
                      thirdBook.cover_image.width,
                      thirdBook.cover_image.height,
                    )}
                    quality="90"
                  />
                </Link>
              </div>
            </div>
          )}
        </Section>
      )}

      {books.length > 3 && (
        <>
          <Divider maxWidth="md" className="my-6" />

          <Section maxWidth="md" noBorder>
            <h5 className="h5 uppercase text-primary-main mb-4">Heading Text Here</h5>
            <h3 className="h3 mb-10">Even More Books Here</h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {books.slice(3).map(book => (
                <div className="flex flex-col" key={book.slug}>
                  <Link href={`/books/${book.slug}`}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${book.cover_image.url}`}
                      alt={`Cover Art: ${book.title}`}
                      width="180"
                      height={calcImageHeight(180, book.cover_image.width, book.cover_image.height)}
                      quality="90"
                    />
                  </Link>
                  <h4 className="text1 mb-2">
                    <Link href={`/books/${book.slug}`}>{book.title}</Link>
                  </h4>
                  <Link href={`/books/${book.slug}`} className="link">
                    Learn More
                  </Link>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}

      <SubscribeSection />

      <SocialSection />
    </>
  );
}

Books.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      cover_image: PropTypes.shape({
        url: PropTypes.string.isRequired,
        alternativeText: PropTypes.string,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
      }).isRequired,
      tagline: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export const getStaticProps = async () => {
  const books = await fetchAPI(`/books`);

  return {
    props: {
      books,
    },
  };
};

export default Books;
