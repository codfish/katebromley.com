import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';

import Link from '@/components/Link';
import Section from '@/components/Section';
import SocialSection from '@/components/SocialSection';
import SubscribeSection from '@/components/SubscribeSection';
import type { AboutKate, Book } from '@/lib/contentful';
import { fetchBooks, fetchKateBromley } from '@/lib/contentful';
import { calcImageHeight, isReleased } from '@/lib/utils';

export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  // Try to use featured book cover as OG/Twitter image; fall back to logo
  const [, books] = await Promise.all([fetchKateBromley(), fetchBooks({ 'fields.featuredBook': true })]);

  const featured = books?.[0] as Book | undefined;
  const ogImage = featured?.coverImage?.url || '/logo.png';

  return {
    title: 'Kate Bromley',
    description:
      'Kate Bromley is the rom-com author of In My Tudor Era, Talk Bookish to Me, Here for the Drama, and Ciao For Now.',
    alternates: { canonical: 'https://www.katebromley.com' },
    openGraph: {
      title: 'Kate Bromley',
      description:
        'Kate Bromley is the rom-com author of In My Tudor Era, Talk Bookish to Me, Here for the Drama, and Ciao For Now.',
      url: 'https://www.katebromley.com',
      siteName: 'Kate Bromley Novels',
      locale: 'en_US',
      type: 'website',
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Kate Bromley',
      description:
        'Kate Bromley is the rom-com author of In My Tudor Era, Talk Bookish to Me, Here for the Drama, and Ciao For Now.',
      images: [ogImage],
    },
  };
}

async function getData(): Promise<{ aboutKate: AboutKate; books: Book[] }> {
  const [aboutKate, books] = await Promise.all([fetchKateBromley(), fetchBooks({ 'fields.featuredBook': true })]);
  return { aboutKate, books };
}

export default async function HomePage() {
  const { aboutKate, books } = await getData();

  const headshotColClasses =
    books.length % 2 === 0
      ? 'text-center md:text-left row-start-1 col-start-1'
      : 'text-center md:text-right row-start-1 col-start-1 md:row-auto md:col-auto';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: 'https://www.katebromley.com',
            name: 'Kate Bromley',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://www.katebromley.com/?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      {books.map((book, index) => {
        const bookColClasses =
          index % 2 === 0
            ? 'text-center row-start-1 col-start-1 md:text-left'
            : 'text-center row-start-1 col-start-1 md:row-auto md:col-auto md:text-right';
        const isPreRelease = !isReleased(book.releaseDate);

        return (
          <Section backdrop={{ color: 'pink', position: index % 2 === 0 ? 'left' : 'right' }} key={book.slug}>
            <div className="grid gap-10 md:grid-cols-2 md:gap-6">
              <div className="flex items-center justify-center">
                <div>
                  {index === 0 && (
                    <h5 className="mb-10 h5 text-pink uppercase">
                      {isPreRelease ? `Available for Pre-order` : 'Latest Release'}
                    </h5>
                  )}
                  <h2 className="mb-4 book-title">
                    <Link href={`/books/${book.slug}`} className="hover:text-teal-dark">
                      {book.title}
                    </Link>
                  </h2>
                  <p className="pb-10 body2 md:w-10/12">{book.tagline}</p>

                  <Link href={`/books/${book.slug}`} className="cta-link block link">
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
                      width={384}
                      height={calcImageHeight(384, book.coverImage.width, book.coverImage.height)}
                      quality={90}
                    />
                  </Link>
                </div>
              )}
            </div>
          </Section>
        );
      })}

      <Section backdrop={{ color: 'pink', position: books.length % 2 === 0 ? 'left' : 'right' }}>
        <div className="grid gap-10 md:grid-cols-2 md:gap-6">
          <div className="flex items-center">
            <div>
              <h2 className="h2 lg:h1">About Kate</h2>

              {aboutKate.bio && <div className="mt-4 body2">{documentToReactComponents(aboutKate.bio)}</div>}

              <Link href="/about" className="cta-link mt-11 block link">
                More about me
              </Link>
            </div>
          </div>

          <div className={headshotColClasses}>
            <Image
              src={`${aboutKate.headshot.url}`}
              alt="Kate Bromley Author Headshot"
              className="inline-block"
              width={384}
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
