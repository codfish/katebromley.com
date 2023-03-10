import { Document } from '@contentful/rich-text-types';
import { Image } from "./image";

export interface Author {
  bio: Document;
  headshot: Image;
}
