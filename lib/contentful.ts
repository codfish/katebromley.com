import { createClient, Entry } from 'contentful';
import { Book } from '../models/book';
import { Praise } from '../models/praise';
import { Author } from '../models/author';
import { FAQ } from '../models/faq';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || 'UNDEFINED_SPACE_ID',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'UNDEFINED_ACCESS_TOKEN',
  host: process.env.CONTENTFUL_HOST,
});

export default client;

export const transformBook = (bookEntry: Entry<Book>): Book => {
  const book = {
    ...bookEntry.fields,
    id: bookEntry.sys.id,
    coverImage: bookEntry.fields.coverImage[0],
    description: bookEntry.fields.description,
    praise: bookEntry.fields.praise?.map(transformPraise),
  };

  return book;
}

export const transformPraise = (praiseEntry: Entry<Praise>): Praise => {
  const praise = {
    ...praiseEntry.fields,
    id: praiseEntry.sys.id,
    image: praiseEntry.fields.image ? praiseEntry.fields.image[0] : null,
    quote: praiseEntry.fields.quote,
  };

  return praise;
}

export const transformAuthor = (authorEntry: Entry<Author>): Author => {
  const author = {
    ...authorEntry.fields,
    id: authorEntry.sys.id,
    headshot: authorEntry.fields.headshot ? authorEntry.fields.headshot[0] : null,
    bio: authorEntry.fields.bio,
  };

  return author;
}

export const transformFaq = (faqEntry: Entry<FAQ>): FAQ => {
  const faq = {
    ...faqEntry.fields,
    id: faqEntry.sys.id,
    answer: faqEntry.fields.answer,
  };

  return faq;
}

export const fetchKateBromley = (): Promise<Author> => {
  return client
    .getEntries({
      content_type: 'author',
      'fields.slug': 'kate-bromley',
    })
    .then(entries => transformAuthor(entries.items[0] as Entry<Author>));
}

export const fetchBooks = (query): Promise<Book[]> => {
  return client
    .getEntries({
      content_type: 'book',
      order: '-fields.releaseDate',
      ...query,
    })
    .then(entries => entries.items.map(transformBook));
}

export const fetchBookBySlug = (slug): Promise<Book> => {
  return client
    .getEntries({
      content_type: 'book',
      'fields.slug': slug,
    })
    .then(entries => transformBook(entries.items[0] as Entry<Book>));
}

export const fetchFaqs = (query): Promise<FAQ[]> => {
  return client
    .getEntries({
      content_type: 'faq',
      order: 'fields.order',
      ...query,
    })
      .then(entries => entries.items.map(transformFaq));
}
