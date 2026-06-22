/**
 * Client-side input formatters — enforce a canonical shape (prefix, casing,
 * allowed characters) as the user types, so URL / email / phone fields submit
 * clean values and can't be filled with obviously-invalid input.
 *
 * Each is pure and idempotent: f(f(x)) === f(x), safe to run on every keystroke.
 */

// Characters allowed in the host+path of a URL (RFC 3986 unreserved + reserved,
// minus whitespace/quotes/brackets that never belong in pasted links).
const URL_DISALLOWED = /[^a-z0-9.\-_~:\/?#@!$&'()*+,;=%]/g;

/** Email: lowercase, strip whitespace, keep only address-safe characters. */
export function formatEmail(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9.@_+-]/g, "");
}

/** URL value typed *after* a visual "https://" prefix (e.g. the hero website
 *  field). Lowercases, removes whitespace, strips any pasted protocol / leading
 *  slashes, and drops disallowed characters — so the stored value is host+path. */
export function formatUrlPath(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/^https?:\/\//, "")
    .replace(/^\/+/, "")
    .replace(URL_DISALLOWED, "");
}

/** URL field with no visual prefix (e.g. LinkedIn / portfolio): forces a
 *  "https://" prefix on any non-empty value, lowercased and sanitized. */
export function formatUrlForce(raw: string): string {
  const rest = formatUrlPath(raw);
  return rest ? `https://${rest}` : "";
}

/** Phone number: digits and single spaces only (no letters or symbols). */
export function formatPhone(raw: string): string {
  return raw
    .replace(/[^\d\s]/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/^\s+/, "");
}

/** Country dial code: a forced leading "+" followed by up to 4 digits. */
export function formatDialCode(raw: string): string {
  return "+" + raw.replace(/\D/g, "").slice(0, 4);
}
