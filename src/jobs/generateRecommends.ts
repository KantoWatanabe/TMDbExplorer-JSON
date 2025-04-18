import { fetchFromTMDb } from "../utils/fetcher";
import { sleep } from "../utils/sleep";
import { saveJson } from "../utils/writer";

interface RecommendItem {
  title: string;
  key: string;
  url: string;
}

const JSON_BASE_URL = process.env.JSON_BASE_URL;
if (!JSON_BASE_URL) {
  throw new Error('JSON_BASE_URL is not set.');
}

const endpoints = [
  { key: "trending", title: "急上昇中の作品", url: "trending/all/week?language=ja-JP" },
  { key: "top-rated", title: "高評価の映画", url: "movie/top_rated?language=ja-JP" },
  { key: "popular-movies", title: "人気の映画", url: "movie/popular?language=ja-JP" },
  { key: "popular-tv", title: "人気のTVシリーズ", url: "tv/popular?language=ja-JP" },
  { key: "now-playing", title: "上映中の映画", url: "movie/now_playing?language=ja-JP&region=JP" },
  { key: "upcoming", title: "近日公開予定", url: "movie/upcoming?language=ja-JP&region=JP" },
  { key: "netflix-originals", title: "Netflixオリジナル", url: "discover/tv?with_networks=213&language=ja-JP" },
  { key: "disney-plus", title: "Disney+作品", url: "discover/tv?with_networks=2739&language=ja-JP" },
  { key: "amazon-prime", title: "Amazonプライム作品", url: "discover/tv?with_networks=1024&language=ja-JP" },
  { key: "action", title: "アクション映画", url: "discover/movie?with_genres=28&language=ja-JP" },
  { key: "comedy", title: "コメディ映画", url: "discover/movie?with_genres=35&language=ja-JP" },
  { key: "drama", title: "ドラマ映画", url: "discover/movie?with_genres=18&language=ja-JP" },
  { key: "romance", title: "恋愛映画", url: "discover/movie?with_genres=10749&language=ja-JP" },
  { key: "horror", title: "ホラー映画", url: "discover/movie?with_genres=27&language=ja-JP" },
  { key: "fantasy", title: "ファンタジー映画", url: "discover/movie?with_genres=14&language=ja-JP" },
  { key: "sci-fi", title: "SF映画", url: "discover/movie?with_genres=878&language=ja-JP" },
  { key: "animation", title: "アニメ映画", url: "discover/movie?with_genres=16&language=ja-JP" },
  { key: "documentary", title: "ドキュメンタリー", url: "discover/movie?with_genres=99&language=ja-JP" },
  { key: "kids", title: "キッズ向け作品", url: "discover/movie?with_genres=10751&language=ja-JP" },
  { key: "mystery", title: "ミステリー映画", url: "discover/movie?with_genres=9648&language=ja-JP" }
];

export async function generateRecommends() {
  const recommends: RecommendItem[] = [];
  for (const endpoint of endpoints) {
    const data = await fetchFromTMDb(endpoint.url);
    const filename = `home/${endpoint.key}.json`;
    saveJson(filename, data);

    recommends.push({
      title: endpoint.title,
      key: endpoint.key,
      url: `${JSON_BASE_URL}/home/${endpoint.key}.json`
    });

    await sleep(500);
  }

  saveJson('home/recommends.json', { recommends });
}
