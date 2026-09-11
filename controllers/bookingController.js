import Booking from "../models/Booking.js";

// Create booking (user only)
export const createBooking = async (req, res) => {
  try {
    const { car, startDate, endDate } = req.body;
    const booking = await Booking.create({
      user: req.user.id,
      car,
      startDate,
      endDate,
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get bookings (user sees own, admin sees all)
export const getBookings = async (req, res) => {
  try {
    let bookings;
    if (req.user.role === "admin") {
      bookings = await Booking.find().populate("car user");
    } else {
      bookings = await Booking.find({ user: req.user.id }).populate("car");
    }
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update booking (user updates own, admin can update any)
export const updateBooking = async (req, res) => {
  try {
    const filter = req.user.role === "admin"
      ? { _id: req.params.id }
      : { _id: req.params.id, user: req.user.id };

    const booking = await Booking.findOne(filter);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.startDate = req.body.startDate || booking.startDate;
    booking.endDate = req.body.endDate || booking.endDate;

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete booking (user deletes own, admin can delete any)
export const deleteBooking = async (req, res) => {
  try {
    const filter = req.user.role === "admin"
      ? { _id: req.params.id }
      : { _id: req.params.id, user: req.user.id };

    const booking = await Booking.findOneAndDelete(filter);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// Admin: Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("car")
      .populate("user", "name email"); // show user info too
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: Update booking
export const adminUpdateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.startDate = req.body.startDate || booking.startDate;
    booking.endDate = req.body.endDate || booking.endDate;

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: Delete booking
export const adminDeleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};