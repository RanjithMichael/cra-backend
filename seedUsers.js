import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js"; 

dotenv.config();

const users = [
  {
    name: "ranjith",
    email: "admin6@example.com",
    password: "ran_1991", 
    role: "admin",
  },
  {
    name: "michael",
    email: "user6@example.com",
    password: "mic_1991",
    role: "user"
  },
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // Clear existing users with same emails
    for (const user of users) {
      await User.deleteOne({ email: user.email });

      // Hash password ONCE before saving
      const hashedPassword = await bcrypt.hash(user.password, 10);

      const newUser = await User.create({
        ...user,
        password: hashedPassword,
      });

      console.log(`✅ User seeded: ${newUser.email}`);
    }

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    mongoose.connection.close();
  }
};

seedUsers();
