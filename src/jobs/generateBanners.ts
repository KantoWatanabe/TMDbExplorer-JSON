import { fetchFromTMDb } from "../utils/fetcher";
import { saveJson } from "../utils/writer";

export async function generateBanners() {
  const data = await fetchFromTMDb("discover/movie?sort_by=popularity.desc&region=JP&language=ja-JP");
  
  const banners = data.results
    .filter((item: any) => item.backdrop_path)
    .slice(0, 5);
    
  saveJson("home/banners.json", banners);
}
  