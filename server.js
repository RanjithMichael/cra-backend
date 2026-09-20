import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";

import cloudinary from "./utils/cloudinary.js";

import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/car.js";
import bookingRoutes from "./routes/booking.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Debug log to confirm Cloudinary config
console.log("🔧 Cloudinary config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "✔️ loaded" : "❌ missing",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "✔️ loaded" : "❌ missing",
});

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Exit if DB connection fails
  }
};
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("🚗 Car Rental Backend API is running...");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
