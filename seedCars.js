import mongoose from "mongoose";
import dotenv from "dotenv";
import Car from "./models/Car.js";

dotenv.config();

const cars = [
  {
    name: "Maruti Swift",
    make: "Maruti",
    model: "Swift",
    year: 2022,
    pricePerDay: 2000,
    available: true,
    image: "https://example.com/swift.jpg",
    category: "Hatchback",
    fuelType: "Petrol",
    description: "Compact hatchback, fuel efficient and easy to drive in city traffic."
  },
  {
    name: "Hyundai Verna",
    make: "Hyundai",
    model: "Verna",
    year: 2023,
    pricePerDay: 3000,
    available: true,
    image: "https://example.com/verna.jpg",
    category: "Sedan",
    fuelType: "Diesel",
    description: "Stylish sedan with spacious interiors and smooth performance."
  },
  {
    name: "Mahindra Thar",
    make: "Mahindra",
    model: "Thar",
    year: 2021,
    pricePerDay: 4500,
    available: true,
    image: "https://example.com/thar.jpg",
    category: "SUV",
    fuelType: "Diesel",
    description: "Rugged SUV built for off-road adventures and tough terrains."
  },
  {
    name: "BMW X5",
    make: "BMW",
    model: "X5",
    year: 2022,
    pricePerDay: 12000,
    available: true,
    image: "https://example.com/x5.jpg",
    category: "Luxury",
    fuelType: "Hybrid",
    description: "Premium luxury SUV with advanced technology and powerful engine."
  },
  {
    name: "Kia Seltos",
    make: "Kia",
    model: "Seltos",
    year: 2023,
    pricePerDay: 5000,
    available: true,
    image: "https://example.com/seltos.jpg",
    category: "SUV",
    fuelType: "Petrol",
    description: "Modern SUV with sporty design and excellent safety features."
  },
  {
    name: "Honda Jazz",
    make: "Honda",
    model: "Jazz",
    year: 2020,
    pricePerDay: 2500,
    available: false,
    image: "https://example.com/jazz.jpg",
    category: "Hatchback",
    fuelType: "Petrol",
    description: "Versatile hatchback with roomy cabin and reliable performance."
  },
  {
    name: "Mercedes-Benz C-Class",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2023,
    pricePerDay: 15000,
    available: true,
    image: "https://example.com/cclass.jpg",
    category: "Luxury",
    fuelType: "Diesel",
    description: "Elegant luxury sedan offering comfort, prestige, and cutting-edge tech."
  },
  {
    name: "Toyota Innova Crysta",
    make: "Toyota",
    model: "Innova Crysta",
    year: 2022,
    pricePerDay: 6000,
    available: true,
    image: "https://example.com/innova.jpg",
    category: "MPV",
    fuelType: "Diesel",
    description: "Spacious MPV ideal for family trips and long-distance travel."
  },
  {
    name: "Tata Nexon EV",
    make: "Tata",
    model: "Nexon EV",
    year: 2023,
    pricePerDay: 3500,
    available: true,
    image: "https://example.com/nexonev.jpg",
    category: "Electric",
    fuelType: "Electric",
    description: "Affordable electric SUV with eco-friendly performance and modern design."
  },
  {
    name: "MG ZS EV",
    make: "MG",
    model: "ZS EV",
    year: 2023,
    pricePerDay: 4000,
    available: true,
    image: "https://example.com/zsev.jpg",
    category: "Electric",
    fuelType: "Electric",
    description: "Compact electric SUV with advanced features and smooth driving."
  },
  {
    name: "Skoda Octavia",
    make: "Skoda",
    model: "Octavia",
    year: 2022,
    pricePerDay: 7000,
    available: true,
    image: "https://example.com/octavia.jpg",
    category: "Sedan",
    fuelType: "Petrol",
    description: "Premium sedan with European styling and refined performance."
  },
  {
    name: "Renault Kwid",
    make: "Renault",
    model: "Kwid",
    year: 2021,
    pricePerDay: 1500,
    available: true,
    image: "https://example.com/kwid.jpg",
    category: "Budget",
    fuelType: "Petrol",
    description: "Entry-level hatchback, affordable and easy to maintain."
  }
];
const seedCars = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Car.deleteMany();
    await Car.insertMany(cars);
    console.log("✅ Cars seeded successfully with new set!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedCars();