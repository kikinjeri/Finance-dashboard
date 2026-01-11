// /src/services/fetchStocks.js
const API_KEY = import.meta.env.VITE_STOCKS_API_KEY;

export async function fetchStocks(
  symbols = ["AAPL", "TSLA", "GOOGL", "MSFT", "AMZN"]
) {
  const results = [];

  for (const sym of symbols) {
    try {
      if (!API_KEY) {
        throw new Error(
          "Missing VITE_STOCKS_API_KEY in environment. Add it to .env as VITE_STOCKS_API_KEY=<key>"
        );
      }

      // 1. Fetch daily prices
      const priceUrl =
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY` +
        `&symbol=${sym}&apikey=${API_KEY}`;

      const priceRes = await fetch(priceUrl);
      const priceData = await priceRes.json();

      const series = priceData["Time Series (Daily)"];
      if (!series) {
        console.error(`No time series for ${sym}:`, priceData);
        continue;
      }

      const prices = Object.values(series)
        .slice(0, 7)
        .map((d) => parseFloat(d["4. close"]))
        .reverse();

      const latestPrice = prices[prices.length - 1];
      const firstPrice = prices[0];
      const changePct = ((latestPrice - firstPrice) / firstPrice) * 100;

      // 2. Fetch market cap (OVERVIEW endpoint)
      const overviewUrl =
        `https://www.alphavantage.co/query?function=OVERVIEW` +
        `&symbol=${sym}&apikey=${API_KEY}`;

      const overviewRes = await fetch(overviewUrl);
      const overviewData = await overviewRes.json();

      const marketCap = parseFloat(overviewData.MarketCapitalization) || null;

      // 3. Push clean, consistent object
      results.push({
        symbol: sym,
        price: latestPrice,
        change: Number(changePct.toFixed(2)),
        marketCap,
        sparkline: prices,
      });
    } catch (err) {
      console.error(`fetchStocks error for ${sym}:`, err);
      continue;
    }
  }

  if (results.length === 0) {
    throw new Error(
      "No stock data could be fetched. Check API key or rate limits."
    );
  }

  return results;
}
