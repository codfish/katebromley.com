import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { fetchBooks } from '../../lib/contentful';
import { isReleased, calcImageHeight } from '../../lib/utils';
import SubscribeSection from '../../components/SubscribeSection';
import SocialSection from '../../components/SocialSection';
import Divider from '../../components/Divider';
import Link from '../../components/Link';
import Section from '../../components/Section';
import PageHeader from '../../components/PageHeader';
import { Book } from '../../lib/contentful';

export const getStaticProps: GetStaticProps = async () => {
  const books = await fetchBooks();

  return {
    props: {
      books,
    },
  };
};
interface BooksProps {
  books: Book[];
}

function Books({ books }: BooksProps) {
  const latestRelease = books[0];

  return (
    <>
      <Head>
        <title>Books by Kate Bromley</title>
        <meta name="description" content="A list of books written by Kate Bromley" />
        <link rel="canonical" href="https://www.katebromley.com/books" />
      </Head>

      <PageHeader>Books</PageHeader>

      <Section noBorder maxWidth="lg">
        <div className="grid md:grid-cols-2 gap-10 md:gap-6">
          <div className="flex items-center">
            <div>
              <h5 className="h5 text-pink uppercase mb-10">
                {isReleased(latestRelease.releaseDate) ? 'Latest Release' : 'Available for Pre-order'}
              </h5>
              <h2 className="book-title mb-4">
                <Link href={`/books/${latestRelease.slug}`} className="hover:text-teal-dark">{latestRelease.title}</Link>
              </h2>
              <p className="body2 pb-10 md:w-10/12">{latestRelease.tagline}</p>

              <Link href={`/books/${latestRelease.slug}`} className="cta-link link block">
                Fall Into the Story
              </Link>
            </div>
          </div>

          {latestRelease.coverImage && (
            <div className="text-center row-start-1 col-start-1 md:row-auto md:col-auto md:text-right">
              <Link href={`/books/${latestRelease.slug}`} className="inline-block md:text-right">
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
          )}
        </div>
      </Section>

      <Divider className="my-6" />

      <Section maxWidth="md" noBorder>
        {books.slice(1).map((book, index) => {
          // alternate order of book & text, starting with the book being on the left
          const isEven = index % 2 === 0;
          const bookColClasses =
            isEven
              ? 'text-center row-start-1 col-start-1 md:text-left' // book is on the left
              : 'text-center row-start-1 col-start-1 md:row-auto md:col-auto md:text-right'; // book is on the right


          return (
            <div className="grid md:grid-cols-4 gap-10 md:gap-6 py-8 first-of-type:pt-0 last-of-type:pb-0">
              <div className="flex justify-center items-center md:col-span-3 md:justify-start">
                <div>
                  <h2 className="book-title mb-4">
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
                      src={book.coverImage.url}
                      alt={`Cover Art: ${book.title}`}
                      className="inline-block"
                      width="256"
                      height={calcImageHeight(256, book.coverImage.width, book.coverImage.height)}
                      quality="90"
                    />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </Section>

      <SubscribeSection />

      <SocialSection />
    </>
  );
}

export default Books;
