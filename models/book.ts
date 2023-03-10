import { EntryFields } from 'contentful';
import { Document } from '@contentful/rich-text-types';
import { Image } from "./image";
import { Praise } from "./praise";

export interface Book {
  id: string;
  title: EntryFields.Text;
  slug: EntryFields.Text;
  releaseDate: EntryFields.Date;
  tagline: EntryFields.Text;
  description: EntryFields.RichText;
  isbn: EntryFields.Text;
  onSale: EntryFields.Boolean;
  amazonUrl?: EntryFields.Text;
  audibleUrl?: EntryFields.Text;
  barnesNobleUrl?: EntryFields.Text;
  indieboundUrl?: EntryFields.Text;
  indigoUrl?: EntryFields.Text;
  koboUrl?: EntryFields.Text;
  appleBooksUrl?: EntryFields.Text;
  googlePlayUrl?: EntryFields.Text;
  libroFmUrl?: EntryFields.Text;
  chirpUrl?: EntryFields.Text;
  bookshopUrl?: EntryFields.Text;
  walmartUrl?: EntryFields.Text;
  targetUrl?: EntryFields.Text;
  praise?: EntryFields.EntryLink<Praise[]>,
  coverImage: Image,
}
