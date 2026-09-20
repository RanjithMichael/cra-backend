import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const adminExists = await User.findOne({ email: "admin@example.com" });
    if (adminExists) {
      console.log("⚠️ Admin already exists, skipping");
    } else {
      await User.create({
        name: "Super Admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
      });
      console.log("✅ Admin user seeded");
    }

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    mongoose.connection.close();
  }
};

seedAdmin();
