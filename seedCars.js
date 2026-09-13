import mongoose from "mongoose";
import dotenv from "dotenv";
import Car from "./models/Car.js"; // adjust path if needed

dotenv.config();

const cars = [
  {
    name: "Toyota Corolla",
    make: "Toyota",
    model: "Corolla",
    year: 2022,
    pricePerDay: 50,
    available: true,
    image: "https://example.com/corolla.jpg",
    category: "Sedan",
  },
  {
    name: "Honda Civic",
    make: "Honda",
    model: "Civic",
    year: 2021,
    pricePerDay: 55,
    available: true,
    image: "https://example.com/civic.jpg",
    category: "Sedan",
  },
  {
    name: "Ford Focus",
    make: "Ford",
    model: "Focus",
    year: 2020,
    pricePerDay: 45,
    available: false,
    image: "https://example.com/focus.jpg",
    category: "Hatchback",
  },
  {
    name: "Tesla Model 3",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    pricePerDay: 120,
    available: true,
    image: "https://example.com/model3.jpg",
    category: "Luxury",
  },
  {
    name: "Toyota Fortuner",
    make: "Toyota",
    model: "Fortuner",
    year: 2022,
    pricePerDay: 250,
    available: true,
    image: "https://example.com/fortuner.jpg",
    category: "SUV",
  },
];

const seedCars = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Car.deleteMany(); // clears old data
    await Car.insertMany(cars);
    console.log("✅ Cars seeded successfully with categories!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedCars();
