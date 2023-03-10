import { EntryFields } from 'contentful';

export interface FAQ {
  id: string;
  question: EntryFields.Text;
  answer: EntryFields.RichText;
}
