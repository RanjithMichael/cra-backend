import express from "express";
import multer from "multer";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  addCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
} from "../controllers/carController.js";

const router = express.Router();

// Multer setup: keep file in memory (no local uploads folder)
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Clean CRUD routes with direct Cloudinary streaming
router.post("/", protect, adminOnly, upload.single("image"), addCar);
router.get("/", getCars);
router.get("/:id", getCarById);
router.put("/:id", protect, adminOnly, upload.single("image"), updateCar);
router.delete("/:id", protect, adminOnly, deleteCar);

export default router;




