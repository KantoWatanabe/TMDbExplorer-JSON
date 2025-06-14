
type MediaType = 'movie' | 'tv' | 'unknown';

function guessMediaType(url: string): MediaType {
  if (url.includes('movie')) return 'movie';
  if (url.includes('tv')) return 'tv';
  return 'unknown';
}

export function enrichResultsWithMediaType<T extends { media_type?: MediaType }>(
  results: T[],
  url: string
): T[] {
  const fallback = guessMediaType(url);
  return results.map(item => ({
    ...item,
    media_type: item.media_type ?? fallback
  }));
}
