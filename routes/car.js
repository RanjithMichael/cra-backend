import express from "express";
import Car from "../models/Car.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add a new car (protected, admin only)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all cars (public)
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single car by ID (public)
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update car (protected, admin only)
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete car (protected, admin only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
