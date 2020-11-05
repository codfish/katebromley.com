/**
 * Format an iso date string using the Intl DateTimeFormat API.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#Parameters|DateTimeFormat options}
 *
 * @todo i18n?
 *
 * @param {string} isoDateStr - The date string to format.
 * @param {object} [options] - `Intl.DateTimeFormat` options.
 * @returns {Intl.DateTimeFormat} - Formatted date.
 */
export const formatDateStr = (
  isoDateStr,
  options = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  },
  stripTime = true,
) => {
  if (!isoDateStr) return '';

  const date = stripTime ? `${isoDateStr.slice(0, 10)}T00:00:00` : isoDateStr;
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
};

/**
 * Checks if a books' release date is in the past.
 *
 * @param {string|Date} releaseDate - Release date of a book.
 * @returns {boolean} - `true` if todays date is after the release date.
 */
export const isReleased = releaseDate => new Date(releaseDate) < Date.now();

/**
 * Calculate a proportional image height based on the desired width,
 * original height and original width.
 *
 * Very basic fractional calculation to find the value of X.
 *
 *    desiredWidth  =   origWidth
 *    ------------     -----------
 *         X            origHeight
 *
 *    X = (desiredWidth * origHeight) / origWidth
 *
 * @param {number} desiredWidth - Desired width of the image.
 * @param {number} origWidth - Original width of the image.
 * @param {number} origHeight - Original height of the image.
 * @returns {number} - Desired height of the image.
 */
export const calcImageHeight = (desiredWidth, origWidth, origHeight) =>
  (desiredWidth * origHeight) / origWidth;
