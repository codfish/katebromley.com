import { Document } from '@contentful/rich-text-types';
import { Image } from "./image";

export interface Author {
  greetingHeader: string;
  greeting: string;
  bio: Document;
  headshot: Image;
}
