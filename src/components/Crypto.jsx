import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function Crypto() {
  const [cryptoData, setCryptoData] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true"
      )
      .then((res) => setCryptoData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const normalizeSparkline = (prices) => {
    if (!prices || prices.length === 0) return [];
    const start = prices[0];
    return prices.map((p) => ({ value: ((p - start) / start) * 100 }));
  };

  // Filter crypto based on selected price range
  const filteredData = cryptoData.filter((c) => {
    if (filter === "all") return true;
    if (filter === "<50") return c.current_price < 50;
    if (filter === "50-500")
      return c.current_price >= 50 && c.current_price <= 500;
    if (filter === "500-2000")
      return c.current_price > 500 && c.current_price <= 2000;
    if (filter === ">2000") return c.current_price > 2000;
    return true;
  });

  return (
    <Paper id="crypto" sx={{ p: 3, pt: 12, minHeight: "100vh" }}>
      <Typography variant="h5" gutterBottom>
        Crypto Market
      </Typography>

      <FormControl sx={{ mb: 2, minWidth: 150 }}>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <MenuItem value="all">All Prices</MenuItem>
          <MenuItem value="<50">Below $50</MenuItem>
          <MenuItem value="50-500">$50 - $500</MenuItem>
          <MenuItem value="500-2000">$500 - $2,000</MenuItem>
          <MenuItem value=">2000">Above $2,000</MenuItem>
        </Select>
      </FormControl>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price (USD)</TableCell>
            <TableCell>24h Change (%)</TableCell>
            <TableCell>
              Trend (7d)
              <Typography variant="caption" display="block">
                Relative % change over last 7 days
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>${c.current_price.toLocaleString()}</TableCell>
              <TableCell
                sx={{
                  color: c.price_change_percentage_24h >= 0 ? "green" : "red",
                }}
              >
                {c.price_change_percentage_24h?.toFixed(2)}%
              </TableCell>
              <TableCell>
                <ResponsiveContainer width={100} height={50}>
                  <LineChart
                    data={normalizeSparkline(c.sparkline_in_7d?.price)}
                  >
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={
                        c.price_change_percentage_24h >= 0 ? "green" : "red"
                      }
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
