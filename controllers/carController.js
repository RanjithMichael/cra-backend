import Car from "../models/Car.js";
import cloudinary from "../utils/cloudinary.js";

// Helper: upload buffer directly to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "car_rental/cars" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

// Add a new car
export const addCar = async (req, res) => {
  try {
    console.log("Cloudinary current config:", cloudinary.config());
    let imageData = null;

    // Case 1: file uploaded via multer
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageData = { url: result.secure_url, public_id: result.public_id };
    }

    // Case 2: frontend passed a Cloudinary URL directly
    if (req.body.image && !req.file) {
      imageData = { url: req.body.image };
    }

    const car = new Car({
      name: req.body.name,
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      pricePerDay: req.body.pricePerDay,
      seats: Number(req.body.seats),
      available: req.body.available ?? true,
      category: req.body.category,
      fuelType: req.body.fuelType,
      transmission: req.body.transmission,
      description: req.body.description,
      image: imageData,
      isPopular: req.body.isPopular ?? false,
    });

    await car.save();
    res.status(201).json(car);
  } catch (err) {
    console.error("❌ Error adding car:", err);
    res.status(500).json({ error: "Failed to add car" });
  }
};

// Get all cars (with optional category or popular filter)
export const getCars = async (req, res) => {
  try {
    const { category, popular } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (popular === "true") filter.isPopular = true; //filter popular cars

    const cars = await Car.find(filter);
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single car by ID
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update car (with optional image replacement)
export const updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: "Car not found" });

    // Replace image if new file uploaded
    if (req.file) {
      if (car.image?.public_id) {
        await cloudinary.uploader.destroy(car.image.public_id);
      }
      const result = await uploadToCloudinary(req.file.buffer);
      car.image = { url: result.secure_url, public_id: result.public_id };
    }

    // Or update with direct Cloudinary URL
    if (req.body.image && !req.file) {
      car.image = { url: req.body.image };
    }

    // Update other fields
    car.name = req.body.name || car.name;
    car.make = req.body.make || car.make;
    car.model = req.body.model || car.model;
    car.year = req.body.year || car.year;
    car.pricePerDay = req.body.pricePerDay || car.pricePerDay;
    car.available = req.body.available ?? car.available;
    car.category = req.body.category || car.category;
    car.fuelType = req.body.fuelType || car.fuelType;
    car.transmission = req.body.transmission || car.transmission;
    car.description = req.body.description || car.description;
    car.seats = Number(req.body.seats) || car.seats;
    car.isPopular = req.body.isPopular ?? car.isPopular;

    await car.save();
    res.json(car);
  } catch (err) {
    console.error("❌ Error updating car:", err);
    res.status(500).json({ error: "Failed to update car" });
  }
};

// Delete car (with image cleanup)
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: "Car not found" });

    if (car.image?.public_id) {
      await cloudinary.uploader.destroy(car.image.public_id);
    }

    await car.deleteOne();
    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting car:", err);
    res.status(500).json({ error: "Failed to delete car" });
  }
};
