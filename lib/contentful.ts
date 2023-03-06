import { createClient, Entry } from 'contentful';
import { Document } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Book } from '../models/book';
import { Praise } from '../models/praise';
import { Author } from '../models/author';
import { FAQ } from '../models/faq';

export default createClient({
  space: process.env.CONTENTFUL_SPACE_ID || 'UNDEFINED_SPACE_ID',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'UNDEFINED_ACCESS_TOKEN',
  host: process.env.CONTENTFUL_HOST,
});

export const transformBook = (bookEntry: Entry<Book>) => {
  const book = {
    ...bookEntry.fields,
    id: bookEntry.sys.id,
    coverImage: bookEntry.fields.coverImage[0],
    description: documentToHtmlString(bookEntry.fields.description as Document),
    praise: (bookEntry.fields.praise || []).map(transformPraise),
  };

  return book;
}

export const transformPraise = (praiseEntry: Entry<Praise>) => {
  const praise = {
    ...praiseEntry.fields,
    id: praiseEntry.sys.id,
    image: praiseEntry.fields.image ? praiseEntry.fields.image[0] : null,
    quote: documentToHtmlString(praiseEntry.fields.quote as Document),
  };

  return praise;
}

export const transformAuthor = (authorEntry: Entry<Author>) => {
  const author = {
    ...authorEntry.fields,
    id: authorEntry.sys.id,
    headshot: authorEntry.fields.headshot ? authorEntry.fields.headshot[0] : null,
    bio: documentToHtmlString(authorEntry.fields.bio as Document),
  };

  return author;
}

export const transformFaq = (faqEntry: Entry<FAQ>) => {
  const faq = {
    ...faqEntry.fields,
    id: faqEntry.sys.id,
    answer: documentToHtmlString(faqEntry.fields.answer as Document),
  };

  return faq;
}
