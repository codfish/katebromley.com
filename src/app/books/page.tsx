import React from 'react';
import Image from 'next/image';
import SubscribeSection from '@/components/SubscribeSection';
import SocialSection from '@/components/SocialSection';
import Divider from '@/components/Divider';
import Link from '@/components/Link';
import Section from '@/components/Section';
import PageHeader from '@/components/PageHeader';
import { fetchBooks } from '@/lib/contentful';
import type { Book } from '@/lib/contentful';
import { isReleased, calcImageHeight } from '@/lib/utils';
import type { Metadata } from 'next';

export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Books by Kate Bromley',
    description: 'A list of books written by Kate Bromley',
    alternates: { canonical: 'https://www.katebromley.com/books' },
    openGraph: {
      title: 'Books by Kate Bromley',
      description: 'A list of books written by Kate Bromley',
      url: 'https://www.katebromley.com/books',
      type: 'website',
      siteName: 'Kate Bromley Novels',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary',
      title: 'Books by Kate Bromley',
      description: 'A list of books written by Kate Bromley',
    },
  };
}

async function getData(): Promise<{ books: Book[] }> {
  const books = await fetchBooks();
  return { books };
}

export default async function BooksPage() {
  const { books } = await getData();
  const latestRelease = books[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Books by Kate Bromley',
            url: 'https://www.katebromley.com/books',
          }),
        }}
      />
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
                  width={384}
                  height={calcImageHeight(
                    384,
                    latestRelease.coverImage.width,
                    latestRelease.coverImage.height,
                  )}
                  quality={90}
                />
              </Link>
            </div>
          )}
        </div>
      </Section>

      <Divider className="my-6" />

      <Section maxWidth="md" noBorder>
        {books.slice(1).map((book, index) => {
          const isEven = index % 2 === 0;
          const bookColClasses =
            isEven
              ? 'text-center row-start-1 col-start-1 md:text-left'
              : 'text-center row-start-1 col-start-1 md:row-auto md:col-auto md:text-right';

          return (
            <div className="grid md:grid-cols-4 gap-10 md:gap-6 py-8 first-of-type:pt-0 last-of-type:pb-0" key={book.slug}>
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
                      width={256}
                      height={calcImageHeight(256, book.coverImage.width, book.coverImage.height)}
                      quality={90}
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


