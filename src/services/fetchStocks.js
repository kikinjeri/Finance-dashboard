// /src/services/fetchStocks.js
const API_KEY = import.meta.env.VITE_STOCKS_API_KEY;

export async function fetchStocks(symbols = ["AAPL", "TSLA", "GOOGL", "MSFT", "AMZN"]) {
  const results = [];

  for (const sym of symbols) {
    try {
      if (!API_KEY) {
        throw new Error("Missing VITE_STOCKS_API_KEY in environment. Add it to .env as VITE_STOCKS_API_KEY=<key>");
      }
      const url =
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY` +
        `&symbol=${sym}&apikey=${API_KEY}`;

      const res = await fetch(url);
      if (!res.ok) {
        console.error(`AlphaVantage returned ${res.status} for ${sym}`);
        continue;
      }

      const data = await res.json();
      const series = data["Time Series (Daily)"];
      if (!series) {
        console.error(`No time series for ${sym}:`, data);
        continue;
      }

      const prices = Object.values(series)
        .slice(0, 7)
        .map((d) => parseFloat(d["4. close"]))
        .reverse();

      results.push({
        symbol: sym,
        price: prices[prices.length - 1],
        change: (((prices[prices.length - 1] - prices[0]) / prices[0]) * 100).toFixed(2),
        sparkline: prices,
      });
    } catch (err) {
      console.error(`fetchStocks error for ${sym}:`, err);
      continue;
    }
  }

  if (results.length === 0) {
    throw new Error("No stock data could be fetched. Check API key or rate limits.");
  }

  return results;
}
