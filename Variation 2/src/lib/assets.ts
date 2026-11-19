/** Resolve a bundled public asset against the configured base path. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

/** Local WebP copy of a photo used by the reference (see scripts/fetch-images.mjs). */
export const photo = (id: string) => asset(`assets/images/${id}.webp`);

export const LOGO = asset('assets/biet-logo.png');

/**
 * Convert an Unsplash reference URL (or local path) to the local WebP asset URL.
 */
export function resolveImageUrl(url?: string): string | undefined {
  if (!url) return undefined;
  const match = url.match(/photo-[a-zA-Z0-9-]+/);
  if (match) {
    return photo(match[0]);
  }
  return url;
}
