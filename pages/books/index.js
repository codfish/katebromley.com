import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Image from 'next/image';
import { fetchBooks } from '../../lib/contentful';
import { formatDateStr, isReleased, calcImageHeight } from '../../lib/utils';
import SubscribeSection from '../../components/SubscribeSection';
import SocialSection from '../../components/SocialSection';
import Divider from '../../components/Divider';
import Button from '../../components/Button';
import Link from '../../components/Link';
import Section from '../../components/Section';
import PageHeader from '../../components/PageHeader';

export const getStaticProps = async () => {
  const books = await fetchBooks();

  return {
    props: {
      books,
    },
  };
};
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
                {isReleased(latestRelease.releaseDate) ? 'Latest Release' : `Coming ${formatDateStr(latestRelease.releaseDate)}`}
              </h5>
              <h2 className="title text-5xl mb-4">
                <Link href={`/books/${latestRelease.slug}`} className="hover:text-secondary-dark">{latestRelease.title}</Link>
              </h2>
              <p className="body2 pb-10 md:w-10/12">{latestRelease.tagline}</p>

              <Button href={`/books/${latestRelease.slug}`} className="mr-4" primary>
                {isReleased(latestRelease.releaseDate) ? 'Buy Now' : 'Pre-order Now'}
              </Button>
            </div>
          </div>

          <div className="text-center row-start-1 col-start-1 md:row-auto md:col-auto md:text-right">
            <Link href={`/books/${latestRelease.slug}`}>
              <Image
                src={latestRelease.coverImage.url}
                alt={`Cover Art: ${latestRelease.title}`}
                width="384"
                height={calcImageHeight(
                  384,
                  latestRelease.coverImage.width,
                  latestRelease.coverImage.height,
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
                    src={secondBook.coverImage.url}
                    alt={`Cover Art: ${secondBook.title}`}
                    width="282"
                    height={calcImageHeight(
                      282,
                      secondBook.coverImage.width,
                      secondBook.coverImage.height,
                    )}
                    quality="90"
                  />
                </Link>
              </div>

              <div className="flex justify-center items-center">
                <div>
                  <h3 className="title text-3xl mb-4">
                    <Link href={`/books/${secondBook.slug}`} className="hover:text-secondary-dark">{secondBook.title}</Link>
                  </h3>

                  <p className="body2 mb-8">{secondBook.tagline}</p>

                  <Button href={`/books/${secondBook.slug}`} primary>
                    {isReleased(secondBook.releaseDate) ? 'Buy Now' : 'Pre-order Now'}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {thirdBook && (
            <div className="grid md:grid-cols-2 gap-10 md:gap-6">
              <div className="flex justify-center items-center">
                <div>
                  <h3 className="title text-3xl mb-4">
                    <Link href={`/books/${thirdBook.slug}`} className="hover:text-secondary-dark">{thirdBook.title}</Link>
                  </h3>

                  <p className="body2 mb-8">{thirdBook.tagline}</p>

                  <Button href={`/books/${thirdBook.slug}`} primary>
                    {isReleased(thirdBook.releaseDate) ? 'Buy Now' : 'Pre-order Now'}
                  </Button>
                </div>
              </div>

              <div className="text-center md:text-right row-start-1 col-start-1 md:row-auto md:col-auto">
                <Link href={`/books/${thirdBook.slug}`}>
                  <Image
                    src={thirdBook.coverImage.url}
                    alt={`Cover Art: ${thirdBook.title}`}
                    width="282"
                    height={calcImageHeight(
                      282,
                      thirdBook.coverImage.width,
                      thirdBook.coverImage.height,
                    )}
                    quality="90"
                  />
                </Link>
              </div>
            </div>
          )}
        </Section>
      )}

      {/* {books.length > 3 && (
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
                      src={book.coverImage.url}
                      alt={`Cover Art: ${book.title}`}
                      width="180"
                      height={calcImageHeight(180, book.coverImage.width, book.coverImage.height)}
                      quality="90"
                    />
                  </Link>
                  <h4 className="text1 mb-2">
                    <Link href={`/books/${book.slug}`} className="hover:text-secondary-dark">{book.title}</Link>
                  </h4>
                  <Link href={`/books/${book.slug}`} className="link">
                    Buy Now
                  </Link>
                </div>
              ))}
            </div>
          </Section>
        </>
      )} */}

      <SubscribeSection />

      <SocialSection />
    </>
  );
}

Books.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      coverImage: PropTypes.shape({
        url: PropTypes.string.isRequired,
        alternativeText: PropTypes.string,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
      }).isRequired,
      tagline: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Books;
