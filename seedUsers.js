import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js"; 

dotenv.config();

const users = [
  {
    name: "Admin5",
    email: "admin5@example.com",
    password: "admin1239",
    role: "admin",
  },
  {
    name: "User5",
    email: "demo5@example.com",
    password: "user1239",
    role: "user",
  },
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    for (const user of users) {
      // Remove existing user with same email
      await User.deleteOne({ email: user.email });

      // Hash password before saving
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
