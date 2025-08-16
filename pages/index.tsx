import React from 'react';
import { GetStaticProps } from 'next';
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
import { AboutKate, Book } from '../lib/contentful';

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [aboutKate, books] = await Promise.all([
      fetchKateBromley(),
      fetchBooks({ 'fields.featuredBook': true }),
    ]);

    return { props: { aboutKate, books } };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

interface HomeProps {
  aboutKate: AboutKate;
  books: Book[];
  preOrderAvailable?: boolean;
}

function Home({ aboutKate, books, preOrderAvailable = false }: HomeProps) {
  const headshotColClasses =
    books.length % 2 === 0
      ? 'text-center md:text-left row-start-1 col-start-1' // headshot is on the left
      : 'text-center md:text-right row-start-1 col-start-1 md:row-auto md:col-auto' // headshot is on the right

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
          <Section backdrop={{ color: 'pink', position: index % 2 === 0 ? 'left' : 'right' }} key={book.slug}>
            <div className="grid md:grid-cols-2 gap-10 md:gap-6">
              <div className="flex justify-center items-center">
                <div>
                  {index === 0 && (
                    <h5 className="h5 text-pink uppercase mb-10">
                      {isPreRelease ? `Available for Pre-order` : 'Latest Release'}
                    </h5>
                  )}
                  {index === 1 && preOrderAvailable && !isPreRelease && (
                    <h5 className="h5 text-pink uppercase mb-10">Latest Release</h5>
                  )}
                  <h2 className="h2 text-h4 md:text-4xl lg:text-h2 mb-4">
                    <Link href={`/books/${book.slug}`} className="hover:text-teal-dark">{book.title}</Link>
                  </h2>
                  <p className="body2 pb-10 md:w-10/12">{book.tagline}</p>

                  <Link href={`/books/${book.slug}`} className="cta-link link block">
                    Fall Into the Story
                  </Link>
                </div>
              </div>

              {book.coverImage && (
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
              )}
            </div>
          </Section>
        );
      })}

      <Section backdrop={{ color: 'pink', position: books.length % 2 === 0 ? 'left' : 'right' }}>
        <div className="grid md:grid-cols-2 gap-10 md:gap-6">
          <div className="flex items-center">
            <div>
              <h2 className="h2 lg:h1">About Kate</h2>

              {aboutKate.bio && <div className="body2 mt-4">{documentToReactComponents(aboutKate.bio)}</div>}

              <Link href="/about" className="cta-link link block mt-11">
                More about me
              </Link>
            </div>
          </div>

          <div className={headshotColClasses}>
            <Image
              src={`${aboutKate.headshot.url}`}
              alt="Kate Bromley Author Headshot"
              className="inline-block"
              width="384"
              height={calcImageHeight(384, aboutKate.headshot.width, aboutKate.headshot.height)}
            />
          </div>
        </div>
      </Section>

      <SubscribeSection />

      <SocialSection />
    </>
  );
}

export default Home;
