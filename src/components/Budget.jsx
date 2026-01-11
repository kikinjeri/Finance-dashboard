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
  Stack,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF33AA",
  "#33FFAA",
];

export default function Budget() {
  const [budget, setBudget] = useState([
    { name: "Income", value: 5000 },
    { name: "Rent", value: 1200 },
    { name: "Food", value: 600 },
    { name: "Entertainment", value: 200 },
    { name: "Other", value: 100 },
  ]);

  const [newCategory, setNewCategory] = useState({ name: "", value: "" });
  const [deleteCategory, setDeleteCategory] = useState("");

  const handleChange = (index, val) => {
    const updated = [...budget];
    updated[index].value = val === "" ? 0 : Number(val);
    setBudget(updated);
  };

  const handleAdd = () => {
    if (!newCategory.name || newCategory.value === "") return;
    setBudget([
      ...budget,
      { name: newCategory.name, value: Number(newCategory.value) },
    ]);
    setNewCategory({ name: "", value: "" });
  };

  const handleDelete = () => {
    if (!deleteCategory) return;
    setBudget(budget.filter((b) => b.name !== deleteCategory));
    setDeleteCategory("");
  };

  const handleReset = () => {
    setBudget([
      { name: "Income", value: 5000 },
      { name: "Rent", value: 1200 },
      { name: "Food", value: 600 },
      { name: "Entertainment", value: 200 },
      { name: "Other", value: 100 },
    ]);
    setNewCategory({ name: "", value: "" });
    setDeleteCategory("");
  };

  const totalIncome = budget.find((b) => b.name === "Income")?.value || 0;
  const totalExpenses = budget
    .filter((b) => b.name !== "Income")
    .reduce((sum, b) => sum + b.value, 0);
  const balance = totalIncome - totalExpenses;

  const expenseData = budget.filter((b) => b.name !== "Income");

  return (
    <Paper id="budget" sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom textAlign="center">
        Personal Budget
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 6,
          mt: 4,
        }}
      >
        {/* Pie chart */}
        <Box sx={{ width: 350 }}>
          <Typography variant="subtitle1" gutterBottom textAlign="center">
            Expenses Distribution
          </Typography>

          {/* Horizontal legend */}
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            mb={2}
            flexWrap="wrap"
          >
            {expenseData.map((e, idx) => (
              <Box
                key={idx}
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    backgroundColor: COLORS[idx % COLORS.length],
                  }}
                />
                <Typography variant="body2">{e.name}</Typography>
              </Box>
            ))}
          </Stack>

          {/* Pie chart container */}
          <Box sx={{ width: "100%", minHeight: 300 }}>
            <ResponsiveContainer width="100%" aspect={1.2}>
              <PieChart>
                <Pie
                  data={expenseData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >
                  {expenseData.map((entry, idx) => (
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

        {/* Budget table */}
        <Box sx={{ minWidth: 300, maxWidth: 400 }}>
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
                      fullWidth
                      inputProps={{ min: 0 }}
                      onFocus={(e) => e.target.select()}
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

              {/* Add new category */}
              <TableRow>
                <TableCell>
                  <TextField
                    placeholder="Category Name"
                    value={newCategory.name}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, name: e.target.value })
                    }
                    size="small"
                    fullWidth
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    placeholder="Amount"
                    type="number"
                    value={newCategory.value}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, value: e.target.value })
                    }
                    size="small"
                    fullWidth
                  />
                </TableCell>

                <TableCell>
                  <Button variant="contained" onClick={handleAdd} size="small">
                    Add
                  </Button>
                </TableCell>
              </TableRow>

              {/* Delete category */}
              <TableRow>
                <TableCell colSpan={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Delete Category</InputLabel>
                    <Select
                      value={deleteCategory}
                      onChange={(e) => setDeleteCategory(e.target.value)}
                      label="Delete Category"
                    >
                      {budget
                        .filter((b) => b.name !== "Income")
                        .map((b) => (
                          <MenuItem key={b.name} value={b.name}>
                            {b.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>

                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ mt: 1 }}
                    fullWidth
                    onClick={handleDelete}
                  >
                    Delete Selected
                  </Button>
                </TableCell>
              </TableRow>

              {/* Reset all */}
              <TableRow>
                <TableCell colSpan={2}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={handleReset}
                  >
                    Reset All Categories
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Paper>
  );
}
