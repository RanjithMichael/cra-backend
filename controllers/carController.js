import Car from "../models/Car.js";

// Add a new car
export const addCar = async (req, res) => {
  try {
    const { name, make, model, year, pricePerDay, available, image, category } = req.body;

    const car = new Car({
      name,
      make,
      model,
      year,
      pricePerDay,
      available,
      image,
      category, // new field
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

// Update car
export const updateCar = async (req, res) => {
  try {
    const { name, make, model, year, pricePerDay, available, image, category } = req.body;

    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { name, make, model, year, pricePerDay, available, image, category },
      { new: true }
    );

    if (!car) return res.status(404).json({ error: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete car
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


