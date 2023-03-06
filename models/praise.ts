import { Document } from '@contentful/rich-text-types';
import { Image } from "./image";

export interface Praise {
  type: 'praise' | 'press';
  sourceName: string;
  sourceDescription: string;
  quote: Document;
  cite?: string;
  image?: Image;
  sourceUrl?: string;
}
