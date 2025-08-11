import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { fetchBookBySlug, fetchBooks } from '../../lib/contentful';
import { formatDateStr, isReleased, calcImageHeight } from '../../lib/utils';
import SubscribeSection from '../../components/SubscribeSection';
import SocialSection from '../../components/SocialSection';
import Section from '../../components/Section';
import Divider from '../../components/Divider';
import Link from '../../components/Link';


export async function getStaticPaths() {
  const books = await fetchBooks();

  return {
    paths: books.map(book => ({ params: { slug: book.slug } })),
    // TODO: loading screen for fallback?
    fallback: false, // See the "fallback" section below
  };
}

export const getStaticProps = async ctx => {
  const { slug } = ctx.params;
  const book = await fetchBookBySlug(slug);

  return {
    props: {
      slug,
      book,
    },
  };
};

function Book({ book }) {
  const isPreRelease = !isReleased(book.releaseDate);

  return (
    <article>
      <Head>
        <title>{`${book.title}, a novel by Kate Bromley`}</title>
        <meta name="description" content={book.tagline} />
        <link rel="canonical" href={`https://www.katebromley.com/books/${book.slug}`} />
        <meta property="og:title" content={`${book.title}, a novel by Kate Bromley`} />
        <meta property="og:site_name" content="Kate Bromley Novels" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:description" content={book.tagline} />
        <meta property="og:image" content={book.coverImage.url} />
        <meta property="og:url" content={`https://www.katebromley.com/books/${book.slug}`} />
        {/* https://ogp.me/#type_book */}
        <meta property="og:type" content="book" />
        <meta property="book:isbn" content={book.isbn} />
        <meta property="book:release_date" content={book.releaseDate} />
        <meta property="book:tag" content="bookstagram" />
        <meta property="book:tag" content="romcom" />
        <meta property="book:tag" content="Romantic Comedy" />
        <meta property="book:tag" content="Books" />
        <meta name="twitter:title" content={book.title} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="border-t-8 border-solid border-pink" />

      <Section noBorder>
        <div className="text-center mb-10 lg:mb-16">
          <Image
            className='inline-block'
            src={book.coverImage.url}
            alt={book.coverImage.alternativeText || `Cover Art: ${book.title}`}
            width="384"
            height={calcImageHeight(384, book.coverImage.width, book.coverImage.height)}
            quality="90"
            priority
          />
        </div>

        <h1 className="h2 text-center mb-12">
          <Link href={`/books/${book.slug}`}>{book.title}</Link>
        </h1>

        <h5 className="h6 uppercase text-center mb-5">
          {isPreRelease ? 'Now Available for Pre-order' : 'Purchase the Book'}
        </h5>

        <div className="text-center mb-8">
          <ul className="flex flex-wrap justify-center">
            {book.amazonUrl && (
              <li className="my-2">
                <a href={book.amazonUrl} className="link py-2 px-4">
                  Amazon
                </a>
              </li>
            )}
            {book.barnesNobleUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.barnesNobleUrl} className="link py-2 px-4">
                  B&N
                </a>
              </li>
            )}
            {book.appleBooksUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.appleBooksUrl} className="link py-2 px-4">
                  Apple Books
                </a>
              </li>
            )}
            {book.googlePlayUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.googlePlayUrl} className="link py-2 px-4">
                  Google Play
                </a>
              </li>
            )}
            {book.audibleUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.audibleUrl} className="link py-2 px-4">
                  Audible
                </a>
              </li>
            )}
            {book.targetUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.targetUrl} className="link py-2 px-4">
                  Target
                </a>
              </li>
            )}
          </ul>

          <ul className="flex flex-wrap justify-center md:mt-5">
            {book.walmartUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.walmartUrl} className="link py-2 px-4">
                  Walmart
                </a>
              </li>
            )}
            {book.indieboundUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.indieboundUrl} className="link py-2 px-4">
                  IndieBound
                </a>
              </li>
            )}
            {book.indigoUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.indigoUrl} className="link py-2 px-4">
                  Indigo
                </a>
              </li>
            )}
            {book.koboUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.koboUrl} className="link py-2 px-4">
                  Kobo
                </a>
              </li>
            )}
            {book.libroFmUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.libroFmUrl} className="link py-2 px-4">
                  Libro.fm
                </a>
              </li>
            )}
            {book.chirpUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.chirpUrl} className="link py-2 px-4">
                  Chirp
                </a>
              </li>
            )}
            {book.bookshopUrl && (
              <li className="my-2 lg:border-l lg:border-gray-border lg:first:border-l-0">
                <a href={book.bookshopUrl} className="link py-2 px-4">
                  Bookshop
                </a>
              </li>
            )}
          </ul>
        </div>

        {isPreRelease && (
          <p className="body1 text-center">Coming {formatDateStr(book.releaseDate)}</p>
        )}
      </Section>

      <Divider />

      <Section>
        <div className="max-w-kb-prose mx-auto">
          <p className="body1 mb-6">{book.tagline}</p>
          <div className="body2 [&>p]:mb-6 [&>p:last-child]:mb-0">{documentToReactComponents(book.description)}</div>
        </div>
      </Section>

      {book.praise && (
        <section
          className='bg-gray-light px-10 py-10 md:py-14 md:px-32'
        >
            <h3 className="h5 uppercase text-pink md:mb-6 text-center">Praise & Press</h3>

            {book.praise.map(praise => (
              <figure className="py-8 md:px-14 text-center last-of-type:pb-0" key={praise.id}>
                <blockquote className="text-lg font-body1 md:body1 mb-4" cite={praise.cite}>
                  {documentToReactComponents(praise.quote)}
                </blockquote>
                <figcaption>
                  <h4 className="text1 mb-2">
                    {praise.cite || praise.sourceUrl ? (
                      <Link href={praise.cite || praise.sourceUrl} target="_blank">{praise.sourceName}</Link>
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

Book.propTypes = {
  book: PropTypes.shape({
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
    description: PropTypes.object.isRequired,
    isbn: PropTypes.string.isRequired,
    onSale: PropTypes.bool,
    amazonUrl: PropTypes.string,
    audibleUrl: PropTypes.string,
    barnesNobleUrl: PropTypes.string,
    indieboundUrl: PropTypes.string,
    indigoUrl: PropTypes.string,
    koboUrl: PropTypes.string,
    appleBooksUrl: PropTypes.string,
    googlePlayUrl: PropTypes.string,
    libroFmUrl: PropTypes.string,
    chirpUrl: PropTypes.string,
    bookshopUrl: PropTypes.string,
    walmartUrl: PropTypes.string,
    praise: PropTypes.arrayOf(
      PropTypes.shape({
        quote: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired,
        sourceName: PropTypes.string.isRequired,
        sourceDescription: PropTypes.string.isRequired,
        sourceUrl: PropTypes.string,
        cite: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default Book;
