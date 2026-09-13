import mongoose from "mongoose";
import dotenv from "dotenv";
import Car from "./models/Car.js";
import Booking from "./models/Booking.js"; // adjust path if needed

dotenv.config();

const resetDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear collections
    await Car.deleteMany();
    await Booking.deleteMany();

    console.log("✅ Database reset: Cars and Bookings cleared!");
    process.exit();
  } catch (error) {
    console.error("❌ Reset error:", error);
    process.exit(1);
  }
};

resetDatabase();
