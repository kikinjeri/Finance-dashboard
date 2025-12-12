// /src/services/fetchNews.js
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export async function fetchNews() {
  if (!API_KEY) {
    throw new Error("Missing VITE_NEWS_API_KEY in environment. Add it to .env as VITE_NEWS_API_KEY=<key>");
  }

  try {
    const url =
      `https://newsdata.io/api/1/news?apikey=${API_KEY}` +
      `&category=technology,business&language=en`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`News API responded ${res.status}`);

    const data = await res.json();
    const results = data.results ? data.results.slice(0, 10) : [];
    return results;
  } catch (err) {
    console.error("fetchNews error:", err);
    throw err;
  }
}
