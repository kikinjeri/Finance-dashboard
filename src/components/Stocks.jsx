import { useState, useEffect, useMemo } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { fetchStocks } from "../services/fetchStocks";

export default function Stocks({ useMock = false }) {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState("market_cap");

  useEffect(() => {
    setLoading(true);

    fetchStocks(useMock)
      .then((data) => setStocks(data || []))
      .finally(() => setLoading(false));
  }, [useMock]);

  // Safe sorting
  const sortedStocks = useMemo(() => {
    let list = [...stocks];

    list.sort((a, b) => {
      if (sortBy === "price") return (b.price || 0) - (a.price || 0);
      if (sortBy === "change") return (b.change || 0) - (a.change || 0);
      if (sortBy === "market_cap")
        return (b.marketCap || 0) - (a.marketCap || 0);
      return 0;
    });

    return list;
  }, [stocks, sortBy]);

  // Safe sparkline normalization
  const normalizeSparkline = (prices) => {
    if (!prices || prices.length === 0) return [];
    const start = prices[0];
    return prices.map((p) => ({ value: ((p - start) / start) * 100 }));
  };

  return (
    <Paper id="stocks" sx={{ p: 3, borderRadius: 3 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
      >
        Stock Market Overview
      </Typography>

      {/* Sorting */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="market_cap">Market Cap</MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="change">24h Change</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Stocks Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell>Price (USD)</TableCell>
            <TableCell>24h Change</TableCell>
            <TableCell>Market Cap</TableCell>
            <TableCell>7d Trend</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedStocks.map((s) => (
            <TableRow key={s.symbol}>
              <TableCell sx={{ fontWeight: "bold" }}>{s.symbol}</TableCell>

              <TableCell>
                {s.price ? `$${s.price.toLocaleString()}` : "—"}
              </TableCell>

              <TableCell
                sx={{
                  color: s.change >= 0 ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {s.change ? `${s.change}%` : "—"}
              </TableCell>

              <TableCell>
                {s.marketCap ? `$${s.marketCap.toLocaleString()}` : "—"}
              </TableCell>

              <TableCell>
                {s.sparkline && s.sparkline.length > 0 ? (
                  <ResponsiveContainer width="100%" height={50}>
                    <LineChart data={normalizeSparkline(s.sparkline)}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={s.change >= 0 ? "green" : "red"}
                        dot={false}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  "—"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
