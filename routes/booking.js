import express from "express";
import Booking from "../models/Booking.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create booking
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { car, startDate, endDate } = req.body;
    const booking = new Booking({
      user: req.user.id,
      car,
      startDate,
      endDate,
    });
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user bookings
router.get("/", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("car");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
