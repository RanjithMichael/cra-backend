import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import cloudinary from "./utils/cloudinary.js";

import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/car.js";
import bookingRoutes from "./routes/booking.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Debug log to confirm Cloudinary config
console.log("Cloudinary config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "✔️ loaded" : "❌ missing",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "✔️ loaded" : "❌ missing",
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("🚗 Car Rental Backend API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
