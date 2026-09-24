// backend/seedAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js"; 

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // Remove any existing admin user
    await User.deleteOne({ email: "admin5@example.com" });

    // Insert new admin with plain text password
    const admin = await User.create({
      name: "Admin5",
      email: "admin5@example.com",
      password: "admin1239",
      role: "admin",
    });

    console.log("✅ Admin user seeded:", admin.email);
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    mongoose.connection.close();
  }
};

seedAdmin();
