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

// Add a new car (image goes straight to Cloudinary)
export const addCar = async (req, res) => {
  try {
    let imageData = null;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageData = { url: result.secure_url, public_id: result.public_id };
    }

    const car = new Car({
      name: req.body.name,
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      pricePerDay: req.body.pricePerDay,
      available: req.body.available,
      category: req.body.category,
      description: req.body.description,
      image: imageData,
    });

    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all cars (with optional category filter)
export const getCars = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
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

    if (req.file) {
      if (car.image?.public_id) {
        await cloudinary.uploader.destroy(car.image.public_id);
      }
      const result = await uploadToCloudinary(req.file.buffer);
      car.image = { url: result.secure_url, public_id: result.public_id };
    }

    car.name = req.body.name || car.name;
    car.make = req.body.make || car.make;
    car.model = req.body.model || car.model;
    car.year = req.body.year || car.year;
    car.pricePerDay = req.body.pricePerDay || car.pricePerDay;
    car.available = req.body.available ?? car.available;
    car.category = req.body.category || car.category;
    car.description = req.body.description || car.description;

    await car.save();
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    res.status(500).json({ error: err.message });
  }
};
