import { Book } from '@/lib/contentful';

/**
 * Format an iso date string using the Intl DateTimeFormat API.
 */
export const formatDateStr = (
  isoDateStr: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  },
  stripTime = true,
): string => {
  if (!isoDateStr) return '';

  const date = stripTime ? `${isoDateStr.slice(0, 10)}T00:00:00` : isoDateStr;
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
};

/**
 * Checks if a books' release date is in the past.
 */
export const isReleased = (releaseDate: string | Date): boolean => 
  new Date(releaseDate) < new Date();

/**
 * Calculate a proportional image height based on the desired width,
 * original height and original width.
 */
export const calcImageHeight = (desiredWidth: number, origWidth: number, origHeight: number): number =>
  (desiredWidth * origHeight) / origWidth;

/**
 * Sort books by release date in descending order.
 */
export const sortBooks = (books: Book[]): Book[] => books.sort(
  (a, b) => Number(new Date(b.releaseDate)) - Number(new Date(a.releaseDate)),
);
