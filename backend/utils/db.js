import mongoose from "mongoose";

export const connectDB = async (uri) => {
  if (!uri) {
    console.error("MongoDB URI is missing in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};
