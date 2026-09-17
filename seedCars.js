import mongoose from "mongoose";
import dotenv from "dotenv";
import Car from "./models/Car.js"; // adjust path if needed

dotenv.config();

const cars = [
  {
    name: "Maruti Swift",
    make: "Maruti",
    model: "Swift",
    year: 2022,
    pricePerDay: 40,
    available: true,
    image: "https://example.com/swift.jpg",
    category: "Hatchback",
  },
  {
    name: "Hyundai Verna",
    make: "Hyundai",
    model: "Verna",
    year: 2023,
    pricePerDay: 60,
    available: true,
    image: "https://example.com/verna.jpg",
    category: "Sedan",
  },
  {
    name: "Mahindra Thar",
    make: "Mahindra",
    model: "Thar",
    year: 2021,
    pricePerDay: 90,
    available: true,
    image: "https://example.com/thar.jpg",
    category: "SUV",
  },
  {
    name: "BMW X5",
    make: "BMW",
    model: "X5",
    year: 2022,
    pricePerDay: 200,
    available: true,
    image: "https://example.com/x5.jpg",
    category: "Luxury",
  },
  {
    name: "Kia Seltos",
    make: "Kia",
    model: "Seltos",
    year: 2023,
    pricePerDay: 75,
    available: true,
    image: "https://example.com/seltos.jpg",
    category: "SUV",
  },
  {
    name: "Honda Jazz",
    make: "Honda",
    model: "Jazz",
    year: 2020,
    pricePerDay: 45,
    available: false,
    image: "https://example.com/jazz.jpg",
    category: "Hatchback",
  },
  {
    name: "Mercedes-Benz C-Class",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2023,
    pricePerDay: 220,
    available: true,
    image: "https://example.com/cclass.jpg",
    category: "Luxury",
  },
];

const seedCars = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Car.deleteMany(); // clears old data
    await Car.insertMany(cars);
    console.log("✅ Cars seeded successfully with new set!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedCars();

