import { useState, useEffect, useMemo } from "react";
import {
  Paper,
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  ButtonGroup,
} from "@mui/material";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { fetchCrypto } from "../services/fetchCrypto";

export default function Crypto({ useMock = false }) {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("market_cap");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState("all");

  useEffect(() => {
    setLoading(true);
    fetchCrypto(useMock)
      .then((data) => setCoins(data || []))
      .finally(() => setLoading(false));
  }, [useMock]);

  const matchesPriceRange = (coin) => {
    const price = coin.current_price || 0;

    switch (priceRange) {
      case "under1":
        return price < 1;
      case "1to10":
        return price >= 1 && price <= 10;
      case "10to100":
        return price >= 10 && price <= 100;
      case "100to1000":
        return price >= 100 && price <= 1000;
      case "1000plus":
        return price >= 1000;
      default:
        return true;
    }
  };

  const matchesSearch = (coin) => {
    const q = search.toLowerCase();
    return (
      coin.name.toLowerCase().includes(q) ||
      coin.symbol.toLowerCase().includes(q)
    );
  };

  const marketOverview = useMemo(() => {
    if (!coins.length) return null;

    const totalMarketCap = coins.reduce(
      (sum, c) => sum + (c.market_cap || 0),
      0
    );

    const btc = coins.find((c) => c.symbol === "btc");
    const eth = coins.find((c) => c.symbol === "eth");

    return {
      totalMarketCap,
      btcDominance: btc ? (btc.market_cap / totalMarketCap) * 100 : 0,
      ethDominance: eth ? (eth.market_cap / totalMarketCap) * 100 : 0,
    };
  }, [coins]);

  const filteredCoins = useMemo(() => {
    return coins
      .filter(matchesSearch)
      .filter(matchesPriceRange)
      .sort((a, b) => {
        if (sortBy === "price")
          return (b.current_price || 0) - (a.current_price || 0);

        if (sortBy === "change")
          return (
            (b.price_change_percentage_24h || 0) -
            (a.price_change_percentage_24h || 0)
          );

        return (b.market_cap || 0) - (a.market_cap || 0);
      });
  }, [coins, search, priceRange, sortBy]);

  return (
    <Paper
      id="crypto-section"
      sx={{
        p: 4,
        borderRadius: 4,
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
      >
        Crypto Market Overview
      </Typography>

      {marketOverview && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            mb: 4,
            p: 2,
            borderRadius: 3,
            backgroundColor: "rgba(255,255,255,0.05)",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 },
            textAlign: "center",
          }}
        >
          <Box>
            <Typography variant="subtitle2">Total Market Cap</Typography>
            <Typography variant="h6">
              ${marketOverview.totalMarketCap.toLocaleString()}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2">BTC Dominance</Typography>
            <Typography variant="h6">
              {marketOverview.btcDominance.toFixed(1)}%
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2">ETH Dominance</Typography>
            <Typography variant="h6">
              {marketOverview.ethDominance.toFixed(1)}%
            </Typography>
          </Box>
        </Box>
      )}

      {/* Search + Filters */}
      <Grid container spacing={3} sx={{ mb: 3, alignItems: "center" }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Search coin"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <ButtonGroup variant="outlined" fullWidth>
            {[
              ["all", "All"],
              ["under1", "Under $1"],
              ["1to10", "$1–$10"],
              ["10to100", "$10–$100"],
              ["100to1000", "$100–$1,000"],
              ["1000plus", "$1,000+"],
            ].map(([key, label]) => (
              <Button
                key={key}
                onClick={() => setPriceRange(key)}
                variant={priceRange === key ? "contained" : "outlined"}
              >
                {label}
              </Button>
            ))}
          </ButtonGroup>
        </Grid>
      </Grid>

      {/* Desktop Header */}
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          mb: 1,
          fontWeight: "bold",
          opacity: 0.8,
          borderBottom: "2px solid rgba(255,255,255,0.2)",
        }}
      >
        <Box sx={{ flex: "1 1 200px", maxWidth: 200 }}>Coin</Box>
        <Box sx={{ width: 120, textAlign: "right" }}>Price</Box>
        <Box sx={{ width: 120, textAlign: "right" }}>24h Change</Box>
        <Box sx={{ width: 160, textAlign: "right" }}>Market Cap</Box>
        <Box sx={{ width: 160, textAlign: "right" }}>7‑Day Trend</Box>
      </Box>

      {/* Rows */}
      {filteredCoins.map((c) => {
        const spark = c.sparkline_in_7d?.price || [];
        const change = c.price_change_percentage_24h ?? 0;
        const marketCap = c.market_cap || 0;

        return (
          <Box
            key={c.id}
            sx={{
              p: 2,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 0 },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
            }}
          >
            {/* Coin */}
            <Box
              sx={{
                flex: "1 1 auto",
                minWidth: { xs: "100%", sm: 200 },
                fontWeight: "bold",
              }}
            >
              {c.name} ({c.symbol.toUpperCase()})
            </Box>

            {/* Price */}
            <Box sx={{ width: { xs: "100%", sm: 120 }, textAlign: "right" }}>
              <Typography
                sx={{
                  display: { xs: "block", sm: "none" },
                  opacity: 0.6,
                  mb: 0.5,
                }}
              >
                Price
              </Typography>
              ${c.current_price?.toLocaleString() || "—"}
            </Box>

            {/* Change */}
            <Box
              sx={{
                width: { xs: "100%", sm: 120 },
                textAlign: "right",
                color: change >= 0 ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              <Typography
                sx={{
                  display: { xs: "block", sm: "none" },
                  opacity: 0.6,
                  mb: 0.5,
                }}
              >
                24h Change
              </Typography>
              {change.toFixed(2)}%
            </Box>

            {/* Market Cap */}
            <Box sx={{ width: { xs: "100%", sm: 160 }, textAlign: "right" }}>
              <Typography
                sx={{
                  display: { xs: "block", sm: "none" },
                  opacity: 0.6,
                  mb: 0.5,
                }}
              >
                Market Cap
              </Typography>
              {marketCap ? `$${marketCap.toLocaleString()}` : "—"}
            </Box>

            {/* Sparkline */}
            <Box
              sx={{
                width: { xs: "100%", sm: 160 },
                height: 50,
                mt: { xs: 1, sm: 0 },
              }}
            >
              <Typography
                sx={{
                  display: { xs: "block", sm: "none" },
                  opacity: 0.6,
                  mb: 0.5,
                }}
              >
                7‑Day Trend
              </Typography>

              <Sparklines data={spark} width={160} height={50}>
                <SparklinesLine color={change >= 0 ? "green" : "red"} />
              </Sparklines>
            </Box>
          </Box>
        );
      })}
    </Paper>
  );
}
