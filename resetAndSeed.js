import mongoose from "mongoose";
import dotenv from "dotenv";
import Car from "./models/Car.js";
import Booking from "./models/Booking.js";
import User from "./models/User.js";

dotenv.config();

const cars = [
  {
    name: "Toyota Corolla",
    make: "Toyota",
    model: "Corolla",
    year: 2022,
    pricePerDay: 50,
    available: true,
    category: "Sedan",
  },
  {
    name: "Honda Civic",
    make: "Honda",
    model: "Civic",
    year: 2021,
    pricePerDay: 55,
    available: true,
    category: "Sedan",
  },
  {
    name: "Ford Focus",
    make: "Ford",
    model: "Focus",
    year: 2020,
    pricePerDay: 45,
    available: false,
    category: "Hatchback",
  },
  {
    name: "Tesla Model 3",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    pricePerDay: 120,
    available: true,
    category: "Luxury",
  },
];

const resetAndSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear collections
    await Car.deleteMany();
    await Booking.deleteMany();

    // Seed cars
    const seededCars = await Car.insertMany(cars);
    console.log("✅ Cars seeded:", seededCars.length);

    // Ensure at least one user exists
    let user = await User.findOne();
    if (!user) {
      console.log("❌ No users found. Please register a user first.");
      process.exit(1);
    }

    // Seed bookings linked to cars + user
    const bookings = [
      {
        user: user._id,
        car: seededCars[0]._id,
        startDate: new Date("2026-09-15"),
        endDate: new Date("2026-09-18"),
        status: "pending",
      },
      {
        user: user._id,
        car: seededCars[1]._id,
        startDate: new Date("2026-09-20"),
        endDate: new Date("2026-09-22"),
        status: "confirmed",
      },
    ];

    await Booking.insertMany(bookings);
    console.log("✅ Bookings seeded:", bookings.length);

    process.exit();
  } catch (error) {
    console.error("❌ Reset/Seed error:", error);
    process.exit(1);
  }
};

resetAndSeed();
