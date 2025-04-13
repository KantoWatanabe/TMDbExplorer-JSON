import { fetchFromTMDb } from '../utils/fetcher';
import { saveJson } from '../utils/writer';

export async function fetchTrendingMovies() {
  const data = await fetchFromTMDb('trending/movie/week');
  saveJson('trending-movies.json', data);
}
