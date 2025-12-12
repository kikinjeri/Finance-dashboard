import { useState, useEffect } from "react";
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
import { fetchStocks } from "../services/fetchStocks";

const mockStocks = [
  { symbol: "AAPL", price: 180, change: 1.2, sparkline: [178, 180, 181] },
  { symbol: "TSLA", price: 250, change: -0.5, sparkline: [251, 250, 249] },
];

export default function Stocks({ useMock = true }) {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    if (useMock) {
      setStocks(mockStocks);
      setLoading(false);
      return;
    }

    fetchStocks()
      .then((data) => {
        if (!mounted) return;
        setStocks(data);
      })
      .catch((err) => {
        console.error(err);
        if (!mounted) return;
        setError(err.message || "Error fetching stocks");
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, [useMock]);

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

      {loading && <Typography>Loading stocks...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell>Price (USD)</TableCell>
            <TableCell>Change (%)</TableCell>
            <TableCell>Trend (7d)</TableCell>
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
