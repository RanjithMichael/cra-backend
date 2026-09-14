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

const router = express.Router();

// Multer setup: store file temporarily before upload
const upload = multer({ dest: "uploads/" });

// ✅ Clean CRUD routes
router.post("/", protect, adminOnly, upload.single("image"), addCar);
router.get("/", getCars);
router.get("/:id", getCarById);
router.put("/:id", protect, adminOnly, upload.single("image"), updateCar);
router.delete("/:id", protect, adminOnly, deleteCar);

export default router;



