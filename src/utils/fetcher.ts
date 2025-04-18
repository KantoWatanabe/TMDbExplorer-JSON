const API_KEY = process.env.TMDB_API_KEY;
if (!API_KEY) {
  throw new Error('TMDB_API_KEY is not set.');
}
export async function fetchFromTMDb(endpoint: string) {
  const [path, queryString] = endpoint.split("?");
  const url = new URL(`https://api.themoviedb.org/3/${path}`);
  if (queryString) {
    const originalParams = new URLSearchParams(queryString);
    for (const [key, value] of originalParams) {
      url.searchParams.append(key, value);
    }
  }
  url.searchParams.append("api_key", API_KEY!);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}
