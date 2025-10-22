import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';

import Divider from '@/components/Divider';
import Link from '@/components/Link';
import Section from '@/components/Section';
import SocialSection from '@/components/SocialSection';
import SubscribeSection from '@/components/SubscribeSection';
import type { Book } from '@/lib/contentful';
import { fetchBookBySlug, fetchBooks } from '@/lib/contentful';
import { calcImageHeight, formatDateStr, isReleased } from '@/lib/utils';

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  const books = await fetchBooks();
  return books.map(book => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const book: Book = await fetchBookBySlug(slug);
  const title = `${book.title}, a novel by Kate Bromley`;
  const url = `https://www.katebromley.com/books/${book.slug}`;
  return {
    title,
    description: book.tagline,
    alternates: { canonical: url },
    openGraph: {
      title,
      siteName: 'Kate Bromley Novels',
      locale: 'en_US',
      description: book.tagline,
      url,
      type: 'book',
      images: book.coverImage ? [{ url: book.coverImage.url }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: book.tagline,
      images: book.coverImage ? [book.coverImage.url] : undefined,
    },
    other: {
      'book:isbn': book.isbn,
      'book:release_date': book.releaseDate,
    },
  };
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book: Book = await fetchBookBySlug(slug);
  const isPreRelease = !isReleased(book.releaseDate);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Book',
            name: book.title,
            isbn: book.isbn,
            url: `https://www.katebromley.com/books/${book.slug}`,
            description: book.tagline,
            image: book.coverImage?.url,
            datePublished: book.releaseDate,
            author: {
              '@type': 'Person',
              name: 'Kate Bromley',
            },
          }),
        }}
      />
      <div className="border-t-8 border-solid border-pink" />

      <Section noBorder>
        {book.coverImage && (
          <div className="mb-10 text-center lg:mb-16">
            <Image
              className="inline-block"
              src={book.coverImage.url}
              alt={book.coverImage.alternativeText || `Cover Art: ${book.title}`}
              width={384}
              height={calcImageHeight(384, book.coverImage.width, book.coverImage.height)}
              quality={100}
              loading="eager"
              fetchPriority="high"
              preload
            />
          </div>
        )}

        <h1 className="mb-12 text-center book-title">
          <Link href={`/books/${book.slug}`}>{book.title}</Link>
        </h1>

        <h5 className="mb-5 text-center h6 uppercase">
          {isPreRelease ? 'Now Available for Pre-order' : 'Shop the Book'}
        </h5>

        <div className="text-center">
          <ul className="flex flex-wrap justify-center">
            {book.amazonUrl && (
              <li className="my-2">
                <a href={book.amazonUrl} className="px-4 py-2 link">
                  Amazon
                </a>
              </li>
            )}
            {book.barnesNobleUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.barnesNobleUrl} className="px-4 py-2 link">
                  B&N
                </a>
              </li>
            )}
            {book.appleBooksUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.appleBooksUrl} className="px-4 py-2 link">
                  Apple Books
                </a>
              </li>
            )}
            {book.googlePlayUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.googlePlayUrl} className="px-4 py-2 link">
                  Google Play
                </a>
              </li>
            )}
            {book.audibleUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.audibleUrl} className="px-4 py-2 link">
                  Audible
                </a>
              </li>
            )}
            {book.targetUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.targetUrl} className="px-4 py-2 link">
                  Target
                </a>
              </li>
            )}
          </ul>

          <ul className="flex flex-wrap justify-center md:mt-5">
            {book.walmartUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.walmartUrl} className="px-4 py-2 link">
                  Walmart
                </a>
              </li>
            )}
            {book.indieboundUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.indieboundUrl} className="px-4 py-2 link">
                  IndieBound
                </a>
              </li>
            )}
            {book.indigoUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.indigoUrl} className="px-4 py-2 link">
                  Indigo
                </a>
              </li>
            )}
            {book.koboUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.koboUrl} className="px-4 py-2 link">
                  Kobo
                </a>
              </li>
            )}
            {book.libroFmUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.libroFmUrl} className="px-4 py-2 link">
                  Libro.fm
                </a>
              </li>
            )}
            {book.chirpUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.chirpUrl} className="px-4 py-2 link">
                  Chirp
                </a>
              </li>
            )}
            {book.bookshopUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.bookshopUrl} className="px-4 py-2 link">
                  Bookshop
                </a>
              </li>
            )}
          </ul>
        </div>

        {isPreRelease && <p className="mt-8 text-center body2">Coming {formatDateStr(book.releaseDate)}</p>}
      </Section>

      <Divider />

      <Section>
        <div className="mx-auto prose text-pretty">
          <p className="mb-6 body1">{book.tagline}</p>
          {book.description && (
            <div className="body2 [&>p]:mb-6 [&>p:last-child]:mb-0">{documentToReactComponents(book.description)}</div>
          )}
        </div>
      </Section>

      {book.praise && (
        <section className="bg-gray-light p-10 md:px-32 md:py-14">
          <h3 className="text-center h5 text-pink uppercase md:mb-6">Praise & Press</h3>

          {book.praise.map(praise => (
            <figure className="py-8 text-center last-of-type:pb-0 md:px-14" key={praise.id}>
              <blockquote className="mb-4 font-body1 text-lg md:body1" cite={praise.cite}>
                {documentToReactComponents(praise.quote)}
              </blockquote>
              <figcaption>
                <h4 className="mb-2 text1">
                  {praise.cite || praise.sourceUrl ? (
                    <Link href={praise.cite || praise.sourceUrl} target="_blank">
                      {praise.sourceName}
                    </Link>
                  ) : (
                    praise.sourceName
                  )}
                </h4>
                <small className="text2">{praise.sourceDescription}</small>
              </figcaption>
            </figure>
          ))}
        </section>
      )}

      <SubscribeSection />
      <SocialSection />
    </article>
  );
}
