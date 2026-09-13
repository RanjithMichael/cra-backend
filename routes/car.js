import express from "express";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  addCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
} from "../controllers/carController.js";
import Car from "../models/Car.js";

const router = express.Router();

// Multer setup: store file temporarily before upload
const upload = multer({ dest: "uploads/" });

// Existing CRUD routes
router.post("/", protect, adminOnly, addCar);
router.get("/", getCars);
router.get("/:id", getCarById);
router.put("/:id", protect, adminOnly, updateCar);
router.delete("/:id", protect, adminOnly, deleteCar);

// New route: add car with image upload
router.post("/upload", protect, adminOnly, upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const car = new Car({
      name: req.body.name,
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      pricePerDay: req.body.pricePerDay,
      available: req.body.available,
      category: req.body.category,
      image: result.secure_url, // Cloudinary URL
    });

    await car.save();
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// New route: update existing car image
router.put("/:id/image", protect, adminOnly, upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    car.image = result.secure_url; // replace old image URL
    await car.save();

    res.json({ message: "Car image updated", car });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

