// ---------------------------------------------------------------------------
// Small, pure helper functions used across the app.
// ---------------------------------------------------------------------------

/** Format a number of minutes into "1h 52m" / "48m". */
export const formatDuration = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};

/** Format an ISO date string into "2024" or "Jan 12, 2024". */
export const formatYear = (iso: string): string => new Date(iso).getFullYear().toString();

export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

/** Clamp a rating (0-10) to a percentage match score, Netflix-style. */
export const ratingToMatch = (rating: number): number => Math.round((rating / 10) * 100);

/** Combine class names while ignoring falsy values. */
export const cn = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ');

/** Basic email validation used by the auth forms. */
export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

/**
 * Password rule: at least 8 characters, one letter and one number.
 */
export const isValidPassword = (password: string): boolean =>
  password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);
