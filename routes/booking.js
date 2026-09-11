import express from "express";
import { createBooking, getBookings, updateBooking, deleteBooking, getAllBookings, adminUpdateBooking, adminDeleteBooking } from "../controllers/bookingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//User routes
router.post("/", authMiddleware, createBooking);   // Create booking
router.get("/", authMiddleware, getBookings);      // Get user bookings
router.put("/:id", authMiddleware, updateBooking);     // Update booking
router.delete("/:id", authMiddleware, deleteBooking);  // Delete booking

//Admin routes
router.get("/admin", protect, adminOnly, getAllBookings);
router.put("/admin/:id", protect, adminOnly, adminUpdateBooking);
router.delete("/admin/:id", protect, adminOnly, adminDeleteBooking);



export default router;
