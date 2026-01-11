// Load environment variables
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import { connectDB } from "./utils/db.js";

const app = express();

// CORS (production-safe)
app.use(
  cors({
    origin: process.env.CLIENT_URL, // your Vercel frontend URL
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Routes
app.use("/api/auth", authRoutes);

// Connect to MongoDB
connectDB(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
