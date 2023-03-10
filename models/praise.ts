import { Image } from './image';
import { EntryFields } from 'contentful';

export interface Praise {
  id: string;
  type: 'praise' | 'press';
  sourceName: EntryFields.Text;
  sourceDescription: EntryFields.Text;
  quote: EntryFields.RichText;
  cite?: EntryFields.Text;
  image?: Image;
  sourceUrl?: EntryFields.Text;
}
