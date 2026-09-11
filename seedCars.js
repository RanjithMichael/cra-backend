import mongoose from "mongoose";
import dotenv from "dotenv";
import Car from "./models/Car.js"; // adjust path if needed

dotenv.config();

const cars = [
  {
    make: "Toyota",
    model: "Corolla",
    year: 2022,
    pricePerDay: 50,
    available: true,
  },
  {
    make: "Honda",
    model: "Civic",
    year: 2021,
    pricePerDay: 55,
    available: true,
  },
  {
    make: "Ford",
    model: "Focus",
    year: 2020,
    pricePerDay: 45,
    available: false,
  },
  {
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    pricePerDay: 120,
    available: true,
  },
];

const seedCars = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Car.deleteMany(); // optional: clears old data
    await Car.insertMany(cars);
    console.log("Cars seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedCars();
