const API_KEY = process.env.TMDB_API_KEY;
if (!API_KEY) {
  throw new Error('TMDB_API_KEY is not set.');
}
export async function fetchFromTMDb(endpoint: string) {
  const url = `https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}
