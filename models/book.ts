import { Document } from '@contentful/rich-text-types';
import { Image } from "./image";
import { Praise } from "./praise";

export interface Book {
  title: string;
  slug: string;
  releaseDate: string;
  tagline: string;
  description: Document;
  isbn: string;
  onSale: boolean;
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
  praise?: Praise[],
  coverImage: Image,
}
