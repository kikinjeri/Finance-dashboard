import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function Crypto() {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
      )
      .then((res) => setCryptoData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Paper
      id="crypto" // <- Add this
      sx={{ p: 3, pt: 12, minHeight: "100vh" }}
    >
      <Typography variant="h5" gutterBottom>
        Crypto Market
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price (USD)</TableCell>
            <TableCell>24h Change (%)</TableCell>
            <TableCell>Market Cap (USD)</TableCell>
            <TableCell>Trend (7d)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cryptoData.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>${c.current_price.toLocaleString()}</TableCell>
              <TableCell
                sx={{
                  color: c.price_change_percentage_24h >= 0 ? "green" : "red",
                }}
              >
                {c.price_change_percentage_24h.toFixed(2)}%
              </TableCell>
              <TableCell>${c.market_cap.toLocaleString()}</TableCell>
              <TableCell>
                <ResponsiveContainer width={100} height={50}>
                  <LineChart
                    data={c.sparkline_in_7d.price.map((p, i) => ({ price: p }))}
                  >
                    <Line
                      type="monotone"
                      dataKey="price"
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
