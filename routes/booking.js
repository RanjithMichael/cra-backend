import express from "express";
import {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
  getAllBookings,
  adminUpdateBooking,
  adminDeleteBooking,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// User routes
router.post("/", protect, createBooking);          // Create booking
router.get("/", protect, getBookings);             // Get bookings (role-based)
router.get("/my", protect, async (req, res) => {   // Explicit "my bookings" route
  try {
    const bookings = await getBookings(req, res);  // reuse controller logic
    // If you want only the user's bookings regardless of role:
    // const bookings = await Booking.find({ user: req.user.id }).populate("car");
    // res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/:id", protect, updateBooking);        // Update booking
router.delete("/:id", protect, deleteBooking);     // Delete booking
router.patch("/:id/status", protect, updateBookingStatus); // User cancel/update status

// Admin routes
router.get("/admin", protect, adminOnly, getAllBookings);
router.put("/admin/:id", protect, adminOnly, adminUpdateBooking);
router.delete("/admin/:id", protect, adminOnly, adminDeleteBooking);
router.patch("/admin/:id/status", protect, adminOnly, updateBookingStatus);

export default router;

