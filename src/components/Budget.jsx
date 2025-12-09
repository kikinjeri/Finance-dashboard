import { useState } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Budget() {
  const [budget, setBudget] = useState([
    { name: "Income", value: 5000 },
    { name: "Rent", value: 1200 },
    { name: "Food", value: 600 },
    { name: "Entertainment", value: 200 },
    { name: "Other", value: 100 },
  ]);

  const handleChange = (index, val) => {
    const updated = [...budget];
    updated[index].value = Number(val);
    setBudget(updated);
  };

  const totalIncome = budget.find((b) => b.name === "Income")?.value || 0;
  const totalExpenses = budget
    .filter((b) => b.name !== "Income")
    .reduce((sum, b) => sum + b.value, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <Paper
      id="budget" // <- Add this
      sx={{ p: 3, pt: 12, minHeight: "100vh" }}
    >
      <Typography variant="h5" gutterBottom>
        Personal Budget
      </Typography>
      <Box sx={{ display: "flex", gap: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Amount ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {budget.map((b, i) => (
              <TableRow key={b.name}>
                <TableCell>{b.name}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={b.value}
                    onChange={(e) => handleChange(i, e.target.value)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>Total Income</TableCell>
              <TableCell>${totalIncome}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Expenses</TableCell>
              <TableCell>${totalExpenses}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Balance</TableCell>
              <TableCell sx={{ color: balance >= 0 ? "green" : "red" }}>
                ${balance}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Box sx={{ width: 200, height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={budget.filter((b) => b.name !== "Income")}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {budget
                  .filter((b) => b.name !== "Income")
                  .map((entry, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={COLORS[idx % COLORS.length]}
                    />
                  ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Paper>
  );
}
