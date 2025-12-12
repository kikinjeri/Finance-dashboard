import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { fetchCrypto } from "../services/fetchCrypto";

const mockCrypto = [
  {
    id: "btc",
    name: "Bitcoin",
    current_price: 30000,
    price_change_percentage_24h: 2,
    sparkline_in_7d: { price: [29500, 29800, 30000, 30200, 30100] },
  },
  {
    id: "eth",
    name: "Ethereum",
    current_price: 2000,
    price_change_percentage_24h: -1.5,
    sparkline_in_7d: { price: [1980, 1990, 2000, 2010, 2005] },
  },
];

export default function Crypto({ useMock = true }) {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    if (useMock) {
      setCryptoData(mockCrypto);
      setLoading(false);
      return;
    }

    fetchCrypto()
      .then((data) => {
        if (!mounted) return;
        setCryptoData(data);
      })
      .catch((err) => {
        console.error(err);
        if (!mounted) return;
        setError(err.message || "Error fetching crypto");
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
    <Paper id="crypto" sx={{ p: 3, pt: 12, minHeight: "100vh" }}>
      <Typography variant="h5" gutterBottom>
        Crypto Market
      </Typography>
      {loading && <Typography>Loading crypto...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price (USD)</TableCell>
            <TableCell>24h Change (%)</TableCell>
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
              <TableCell>
                <ResponsiveContainer width={100} height={50}>
                  <LineChart
                    data={normalizeSparkline(c.sparkline_in_7d?.price || [])}
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
