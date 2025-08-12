import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export interface ContentfulImage {
  url: string;
  width: number;
  height: number;
  alternativeText?: string;
}

export interface AboutKate {
  greeting_header?: string;
  greeting: string;
  bio: Document;
  headshot: ContentfulImage;
}

export interface Praise {
  id: string;
  quote: Document;
  type: string;
  sourceName: string;
  sourceDescription: string;
  sourceUrl?: string;
  cite?: string;
}

export interface Book {
  title: string;
  releaseDate: string;
  slug: string;
  coverImage: ContentfulImage | null;
  tagline: string;
  description: Document | null;
  isbn: string;
  onSale?: boolean;
  amazonUrl?: string;
  audibleUrl?: string;
  barnesNobleUrl?: string;
  indieboundUrl?: string;
  indigoUrl?: string;
  koboUrl?: string;
  appleBooksUrl?: string;
  googlePlayUrl?: string;
  libroFmUrl?: string;
  chirpUrl?: string;
  bookshopUrl?: string;
  walmartUrl?: string;
  targetUrl?: string;
  praise?: Praise[] | null;
}

export interface FAQ {
  id: string;
  question: string;
  answer: Document;
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || 'UNDEFINED_SPACE_ID',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'UNDEFINED_ACCESS_TOKEN',
  host: process.env.CONTENTFUL_HOST,
});

export default client;

export const transformBook = (bookEntry: any): Book => {
  const coverImage = bookEntry.fields.coverImage;
  const book = {
    ...bookEntry.fields,
    coverImage: Array.isArray(coverImage) ? coverImage[0] : coverImage || null,
    description: bookEntry.fields.description || null,
    praise: bookEntry.fields.praise?.map((entry: any) => transformPraise(entry)) || null,
  };

  return book;
}

export const transformPraise = (praiseEntry: any): Praise => {
  const praise = {
    ...praiseEntry.fields,
    id: praiseEntry.sys.id,
    image: praiseEntry.fields.image ? praiseEntry.fields.image[0] : null,
    quote: praiseEntry.fields.quote,
  };

  return praise;
}

export const transformAuthor = (authorEntry: any): AboutKate => {
  const author = {
    ...authorEntry.fields,
    headshot: Array.isArray(authorEntry.fields.headshot) ? authorEntry.fields.headshot[0] : authorEntry.fields.headshot,
    bio: authorEntry.fields.bio,
  };

  return author;
}

export const transformFaq = (faqEntry: any): FAQ => {
  const faq = {
    ...faqEntry.fields,
    id: faqEntry.sys.id,
    answer: faqEntry.fields.answer,
  };

  return faq;
}

export const fetchKateBromley = (): Promise<AboutKate> => {
  return client
    .getEntries({
      content_type: 'author',
      'fields.slug': 'kate-bromley',
    })
    .then(entries => transformAuthor(entries.items[0]));
}

export const fetchBooks = (query?: any): Promise<Book[]> => {
  return client
    .getEntries({
      content_type: 'book',
      order: '-fields.releaseDate',
      ...query,
    })
    .then(entries => entries.items.map(entry => transformBook(entry)));
}

export const fetchBookBySlug = (slug: string): Promise<Book> => {
  return client
    .getEntries({
      content_type: 'book',
      'fields.slug': slug,
    })
    .then(entries => transformBook(entries.items[0]));
}

export const fetchFaqs = (query?: any): Promise<FAQ[]> => {
  return client
    .getEntries({
      content_type: 'faq',
      order: 'fields.order',
      ...query,
    })
      .then(entries => entries.items.map(entry => transformFaq(entry)));
}
