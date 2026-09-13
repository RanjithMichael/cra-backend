import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  addCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
} from "../controllers/carController.js";

const router = express.Router();

// Routes
router.post("/", protect, adminOnly, addCar);
router.get("/", getCars);
router.get("/:id", getCarById);
router.put("/:id", protect, adminOnly, updateCar);
router.delete("/:id", protect, adminOnly, deleteCar);

export default router;

