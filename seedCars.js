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
  },
  {
  name: "Audi A4",
  make: "Audi",
  model: "A4",
  year: 2022,
  pricePerDay: 11000,
  available: true,
  image: "https://example.com/a4.jpg",
  category: "Luxury",
  fuelType: "Petrol",
  description: "Premium sedan offering refined performance and comfort."
},
{
  name: "Jeep Compass",
  make: "Jeep",
  model: "Compass",
  year: 2023,
  pricePerDay: 5500,
  available: true,
  image: "https://example.com/compass.jpg",
  category: "SUV",
  fuelType: "Diesel",
  description: "Rugged SUV with off-road capability and modern features."
},
{
  name: "Nissan Magnite",
  make: "Nissan",
  model: "Magnite",
  year: 2022,
  pricePerDay: 2800,
  available: true,
  image: "https://example.com/magnite.jpg",
  category: "Budget",
  fuelType: "Petrol",
  description: "Affordable compact SUV with stylish design and efficient engine."
},
{
  name: "Ford EcoSport",
  make: "Ford",
  model: "EcoSport",
  year: 2021,
  pricePerDay: 3200,
  available: true,
  image: "https://example.com/ecosport.jpg",
  category: "SUV",
  fuelType: "Petrol",
  description: "Compact SUV with sporty design and agile handling."
},
{
  name: "Audi A4",
  make: "Audi",
  model: "A4",
  year: 2022,
  pricePerDay: 11000,
  available: true,
  image: "https://example.com/a4.jpg",
  category: "Luxury",
  fuelType: "Petrol",
  description: "Premium sedan offering refined performance and comfort."
},
{
  name: "Jeep Compass",
  make: "Jeep",
  model: "Compass",
  year: 2023,
  pricePerDay: 5500,
  available: true,
  image: "https://example.com/compass.jpg",
  category: "SUV",
  fuelType: "Diesel",
  description: "Rugged SUV with off-road capability and modern features."
},
{
  name: "Nissan Magnite",
  make: "Nissan",
  model: "Magnite",
  year: 2022,
  pricePerDay: 2800,
  available: true,
  image: "https://example.com/magnite.jpg",
  category: "Budget",
  fuelType: "Petrol",
  description: "Affordable compact SUV with stylish design and efficient engine."
},
{
  name: "Volkswagen Polo",
  make: "Volkswagen",
  model: "Polo",
  year: 2021,
  pricePerDay: 2600,
  available: true,
  image: "https://example.com/polo.jpg",
  category: "Hatchback",
  fuelType: "Petrol",
  description: "European hatchback with solid build and refined driving."
},
{
  name: "Tesla Model 3",
  make: "Tesla",
  model: "Model 3",
  year: 2023,
  pricePerDay: 18000,
  available: true,
  image: "https://example.com/model3.jpg",
  category: "Electric",
  fuelType: "Electric",
  description: "High-tech electric sedan with autopilot and long range."
},
{
  name: "Volvo XC60",
  make: "Volvo",
  model: "XC60",
  year: 2022,
  pricePerDay: 9500,
  available: true,
  image: "https://example.com/xc60.jpg",
  category: "Luxury",
  fuelType: "Hybrid",
  description: "Safe and stylish luxury SUV with Scandinavian design."
},
{
  name: "Suzuki Baleno",
  make: "Suzuki",
  model: "Baleno",
  year: 2021,
  pricePerDay: 2200,
  available: true,
  image: "https://example.com/baleno.jpg",
  category: "Hatchback",
  fuelType: "Petrol",
  description: "Popular hatchback with spacious interiors and smooth ride."
},
{
  name: "Honda City",
  make: "Honda",
  model: "City",
  year: 2022,
  pricePerDay: 3500,
  available: true,
  image: "https://example.com/city.jpg",
  category: "Sedan",
  fuelType: "Petrol",
  description: "Reliable sedan with refined performance and comfort."
},
{
  name: "Toyota Fortuner",
  make: "Toyota",
  model: "Fortuner",
  year: 2023,
  pricePerDay: 9000,
  available: true,
  image: "https://example.com/fortuner.jpg",
  category: "SUV",
  fuelType: "Diesel",
  description: "Powerful SUV with commanding road presence."
},
{
  name: "Jaguar XF",
  make: "Jaguar",
  model: "XF",
  year: 2022,
  pricePerDay: 14000,
  available: true,
  image: "https://example.com/jaguarxf.jpg",
  category: "Luxury",
  fuelType: "Petrol",
  description: "Elegant luxury sedan with sporty performance."
},
{
  name: "Mahindra Scorpio-N",
  make: "Mahindra",
  model: "Scorpio-N",
  year: 2023,
  pricePerDay: 4800,
  available: true,
  image: "https://example.com/scorpio.jpg",
  category: "SUV",
  fuelType: "Diesel",
  description: "Rugged SUV with modern design and features."
},
{
  name: "Hyundai i20",
  make: "Hyundai",
  model: "i20",
  year: 2021,
  pricePerDay: 2400,
  available: true,
  image: "https://example.com/i20.jpg",
  category: "Hatchback",
  fuelType: "Petrol",
  description: "Premium hatchback with advanced features."
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