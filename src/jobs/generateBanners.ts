import { enrichResultsWithMediaType } from "../utils/enricher";
import { fetchFromTMDb } from "../utils/fetcher";
import { saveJson } from "../utils/writer";

export async function generateBanners() {
  const url = "discover/movie?sort_by=popularity.desc&region=JP&language=ja-JP";
  const data = await fetchFromTMDb(url);
  
  const results = data.results
    .filter((item: any) => item.backdrop_path)
    .slice(0, 5);
  
  const enrichedResults = enrichResultsWithMediaType(results, url);

  saveJson("home/banners.json", enrichedResults);
}
  