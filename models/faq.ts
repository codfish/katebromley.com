import { Document } from '@contentful/rich-text-types';

export interface FAQ {
  id: string;
  question: string;
  answer: Document;
}
