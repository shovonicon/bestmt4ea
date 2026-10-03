/**
 * Date helpers.
 *
 * Two different things are deliberately kept apart:
 *
 *  - `monthYear` describes the current catalogue ("September 2026") for titles
 *    and labels. It is build time, and it is used as a *label*, never as a
 *    claim about how fresh any data is.
 *  - the `*VerifiedAt` values record when content, the catalogue and the
 *    performance figures were actually checked, sourced from
 *    `src/data/site-verification.json`. These are the only dates that may sit
 *    next to data, and the only ones that go into structured data.
 *
 * Build time is never a `dateModified`. Emitting it told search engines every
 * page changed on every deploy, which is both untrue and — on a YMYL site —
 * the kind of freshness claim that erodes trust when it does not hold.
 */

import verification from '../data/site-verification.json';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

const now = new Date();

export const currentYear = now.getUTCFullYear();
export const currentMonth = MONTHS[now.getUTCMonth()];
/** Catalogue label for titles: "September 2026". Build time, used as a label. */
export const monthYear = `${currentMonth} ${currentYear}`;

/** Parse a `YYYY-MM-DD` verification date as UTC midnight. */
const asUtcDate = (value: string): Date => new Date(`${value}T00:00:00.000Z`);

/** When the editorial content was last actually reviewed. */
export const contentReviewedAt = asUtcDate(verification.contentReviewedAt);
/** When the product catalogue and its prices were last checked. */
export const catalogueVerifiedAt = asUtcDate(verification.catalogueVerifiedAt);
/** When the published performance figures were last verified at source. */
export const performanceVerifiedAt = asUtcDate(verification.performanceVerifiedAt);
/** Where those performance figures were verified. */
export const performanceSource = verification.performanceSource;
