import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function Stocks() {
  const [stocks] = useState([
    {
      symbol: "AAPL",
      price: 180,
      change: 1.2,
      sparkline: [178, 179, 180, 182, 181, 180, 180],
    },
    {
      symbol: "TSLA",
      price: 250,
      change: -0.5,
      sparkline: [252, 251, 250, 249, 250, 250, 250],
    },
    {
      symbol: "GOOGL",
      price: 2800,
      change: 0.8,
      sparkline: [2780, 2790, 2800, 2810, 2805, 2800, 2800],
    },
    {
      symbol: "MSFT",
      price: 305,
      change: -0.3,
      sparkline: [307, 306, 305, 304, 305, 305, 305],
    },
    {
      symbol: "AMZN",
      price: 3450,
      change: 0.5,
      sparkline: [3430, 3440, 3450, 3460, 3455, 3450, 3450],
    },
    {
      symbol: "NFLX",
      price: 510,
      change: 1.0,
      sparkline: [505, 508, 510, 512, 511, 510, 510],
    },
    {
      symbol: "NVDA",
      price: 420,
      change: -0.7,
      sparkline: [425, 423, 422, 421, 420, 420, 420],
    },
    {
      symbol: "META",
      price: 200,
      change: 0.2,
      sparkline: [198, 199, 200, 201, 200, 200, 200],
    },
    {
      symbol: "IBM",
      price: 130,
      change: 0.1,
      sparkline: [129, 129, 130, 131, 130, 130, 130],
    },
    {
      symbol: "ORCL",
      price: 90,
      change: -0.4,
      sparkline: [91, 90, 90, 89, 90, 90, 90],
    },
  ]);

  const normalizeSparkline = (prices) => {
    if (!prices || prices.length === 0) return [];
    const start = prices[0];
    return prices.map((p) => ({ value: ((p - start) / start) * 100 }));
  };

  return (
    <Paper id="stocks" sx={{ p: 3, pt: 12, minHeight: "100vh" }}>
      <Typography variant="h5" gutterBottom>
        Stock Market
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell>Price (USD)</TableCell>
            <TableCell>Change (%)</TableCell>
            <TableCell>
              Trend (7d)
              <Typography variant="caption" display="block">
                Relative % change over last 7 days
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocks.map((s) => (
            <TableRow key={s.symbol}>
              <TableCell>{s.symbol}</TableCell>
              <TableCell>${s.price.toLocaleString()}</TableCell>
              <TableCell sx={{ color: s.change >= 0 ? "green" : "red" }}>
                {s.change}%
              </TableCell>
              <TableCell>
                <ResponsiveContainer width={100} height={50}>
                  <LineChart data={normalizeSparkline(s.sparkline)}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={s.change >= 0 ? "green" : "red"}
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
