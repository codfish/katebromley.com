import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';
import { fetchAPI } from '../../lib/api';
import { formatDateStr, isReleased, calcImageHeight } from '../../lib/utils';
import SubscribeSection from '../../components/SubscribeSection';
import SocialSection from '../../components/SocialSection';
import Carousel from '../../components/Carousel';
import Section from '../../components/Section';
import Divider from '../../components/Divider';
import Link from '../../components/Link';
import styles from './slug.module.css';

function Book({ book }) {
  const isPreRelease = !isReleased(book.release_date);

  return (
    <article>
      <Head>
        <title>{book.title}, a novel by Kate Bromley</title>
        <meta name="description" content={book.tagline} />
        <link rel="canonical" href={`https://www.katebromley.com/books/${book.slug}`} />
        <meta property="og:title" content={book.title} />
        <meta property="og:description" content={book.tagline} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${book.cover_image.url}`}
        />
        <meta property="og:url" content={`https://www.katebromley.com/books/${book.slug}`} />
        <meta name="twitter:title" content={book.title} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="border-t-8 border-solid border-primary-main lg:mb-10" />

      <Section noBorder>
        <div className="text-center mb-10 lg:mb-16">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${book.cover_image.url}`}
            alt={book.cover_image.alternativeText || `Cover Art: ${book.title}`}
            width="384"
            height={calcImageHeight(384, book.cover_image.width, book.cover_image.height)}
            quality="90"
          />
        </div>

        <h1 className="h2 text-center mb-12">
          <Link href={`/books/${book.slug}`}>{book.title}</Link>
        </h1>

        <h5 className="h6 uppercase text-center mb-5">
          {isPreRelease ? 'Now Available for Pre-order' : 'Purchase the Book'}
        </h5>

        <div className="text-center mb-8">
          <ul className="inline-flex flex-wrap justify-center">
            {book.amazon_url && (
              <li className={styles.purchaseListItem}>
                <a href={book.amazon_url} className="link hover:underline">
                  Amazon
                </a>
              </li>
            )}
            {book.barnes_noble_url && (
              <li className={styles.purchaseListItem}>
                <a href={book.barnes_noble_url} className="link hover:underline">
                  B&N
                </a>
              </li>
            )}
            {book.apple_books_url && (
              <li className={styles.purchaseListItem}>
                <a href={book.apple_books_url} className="link hover:underline">
                  Apple Books
                </a>
              </li>
            )}
            {book.google_play_url && (
              <li className={styles.purchaseListItem}>
                <a href={book.google_play_url} className="link hover:underline">
                  Google Play
                </a>
              </li>
            )}
            {book.audible_url && (
              <li className={styles.purchaseListItem}>
                <a href={book.audible_url} className="link hover:underline">
                  Audible
                </a>
              </li>
            )}
            {book.walmart_url && (
              <li className={styles.purchaseListItem}>
                <a href={book.walmart_url} className="link hover:underline">
                  Walmart
                </a>
              </li>
            )}
            {book.indiebound_url && (
              <li className={styles.purchaseListItem}>
                <a href={book.indiebound_url} className="link hover:underline">
                  IndieBound
                </a>
              </li>
            )}
            {book.indigo_url && (
              <li className={styles.purchaseListItem}>
                <a href={book.indigo_url} className="link hover:underline">
                  Indigo
                </a>
              </li>
            )}
            {book.kobo_url && (
              <li className={styles.purchaseListItem}>
                <a href={book.kobo_url} className="link hover:underline">
                  Kobo
                </a>
              </li>
            )}
            {book.libro_fm_url && (
              <li className={styles.purchaseListItem}>
                <a href={book.libro_fm_url} className="link hover:underline">
                  Libro.fm
                </a>
              </li>
            )}
            {book.chirp_url && (
              <li className={styles.purchaseListItem}>
                <a href={book.chirp_url} className="link hover:underline">
                  Chirp
                </a>
              </li>
            )}
            {book.bookshop_url && (
              <li className={styles.purchaseListItem}>
                <a href={book.bookshop_url} className="link hover:underline">
                  Bookshop
                </a>
              </li>
            )}
          </ul>
        </div>

        {isPreRelease && (
          <p className="body1 text-center">Coming {formatDateStr(book.release_date)}</p>
        )}
      </Section>

      <Divider />

      <Section>
        <div className="max-w-kb-prose mx-auto">
          <h5 className="h6 uppercase mb-10">More About the Book</h5>
          <p className="body1 mb-6">{book.tagline}</p>
          <ReactMarkdown className={`body2 ${styles.description}`}>
            {book.description}
          </ReactMarkdown>
        </div>
      </Section>

      {book.praise && (
        <section
          className={clsx(styles.praise, 'bg-gray-light px-10 pt-8 pb-14 md:px-32 md:pb-20')}
        >
          <Carousel>
            {book.praise.map(praise => (
              <figure className="py-2 px-2 md:pt-10 md:pb-8 md:px-14 text-center" key={praise.id}>
                <h5 className="h5 uppercase text-primary-main mb-6">{praise.type}</h5>
                <blockquote className="body1 mb-6" cite={praise.cite}>
                  {praise.quote}
                </blockquote>
                <figcaption>
                  <h4 className="text1 mb-2">
                    {praise.source_url ? (
                      <Link href={praise.source_url}>{praise.source_name}</Link>
                    ) : (
                      praise.source_name
                    )}
                  </h4>
                  <small className="text2">{praise.source_description}</small>
                </figcaption>
              </figure>
            ))}
          </Carousel>
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
    release_date: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cover_image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      alternativeText: PropTypes.string,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
    tagline: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onSale: PropTypes.bool,
    amazon_url: PropTypes.string,
    audible_url: PropTypes.string,
    barnes_noble_url: PropTypes.string,
    indiebound_url: PropTypes.string,
    indigo_url: PropTypes.string,
    kobo_url: PropTypes.string,
    apple_books_url: PropTypes.string,
    google_play_url: PropTypes.string,
    libro_fm_url: PropTypes.string,
    chirp_url: PropTypes.string,
    bookshop_url: PropTypes.string,
    walmart_url: PropTypes.string,
    praise: PropTypes.arrayOf(
      PropTypes.shape({
        quote: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        source_name: PropTypes.string.isRequired,
        source_description: PropTypes.string.isRequired,
        source_url: PropTypes.string,
        cite: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export const getStaticProps = async ctx => {
  const { slug } = ctx.params;
  const book = await fetchAPI(`/books/${slug}`);

  return {
    props: {
      slug,
      book,
    },
  };
};

export async function getStaticPaths() {
  const books = await fetchAPI(`/books`);
  return {
    paths: books.map(b => ({ params: { slug: b.slug } })),
    // TODO: loading screen for fallback?
    fallback: false, // See the "fallback" section below
  };
}

export default Book;
