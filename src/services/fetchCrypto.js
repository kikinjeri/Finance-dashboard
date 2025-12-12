// /src/services/fetchCrypto.js
export async function fetchCrypto() {
  try {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets" +
      "?vs_currency=usd" +
      "&order=market_cap_desc" +
      "&per_page=10" +
      "&page=1" +
      "&sparkline=true" +
      "&price_change_percentage=24h";

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Crypto API responded ${res.status}`);

    return await res.json();
  } catch (err) {
    console.error("fetchCrypto error:", err);
    throw err;
  }
}
