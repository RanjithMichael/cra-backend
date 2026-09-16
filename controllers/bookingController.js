import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// Helper: calculate days between two dates
const calculateDays = (startDate, endDate) => {
  return Math.ceil(
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
  );
};

// Create booking (user only)
export const createBooking = async (req, res) => {
  try {
    const { carId, startDate, endDate } = req.body;

    // Validate dates
    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({ message: "End date must be after start date" });
    }

    // Check overlapping confirmed bookings
    const overlapping = await Booking.findOne({
      car: carId,
      status: "confirmed",
      startDate: { $lte: endDate },
      endDate: { $gte: startDate }
    });
    if (overlapping) {
      return res.status(400).json({ message: "Car not available for selected dates" });
    }

    // Fetch car details
    const carDetails = await Car.findById(carId);
    if (!carDetails) return res.status(404).json({ message: "Car not found" });

    const days = calculateDays(startDate, endDate);
    const totalCost = days * carDetails.pricePerDay;

    const booking = await Booking.create({
      user: req.user._id,
      car: carId,
      startDate,
      endDate,
      status: "pending",
      payment: {
        amount: totalCost,
        currency: "USD",
        status: "unpaid",
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get bookings (user sees own, admin sees all)
export const getBookings = async (req, res) => {
  try {
    let bookings;
    if (req.user.role === "admin") {
      bookings = await Booking.find()
        .populate("car", "make model year pricePerDay available image")
        .populate("user", "name email");
    } else {
      bookings = await Booking.find({ user: req.user._id })
        .populate("car", "make model year pricePerDay available image");
    }
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update booking (user updates own, admin can update any)
export const updateBooking = async (req, res) => {
  try {
    const filter = req.user.role === "admin"
      ? { _id: req.params.id }
      : { _id: req.params.id, user: req.user._id };

    const booking = await Booking.findOne(filter);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (req.body.startDate) booking.startDate = req.body.startDate;
    if (req.body.endDate) booking.endDate = req.body.endDate;

    if (req.body.startDate || req.body.endDate) {
      // Validate new dates
      if (new Date(booking.startDate) >= new Date(booking.endDate)) {
        return res.status(400).json({ message: "End date must be after start date" });
      }

      // Check overlapping confirmed bookings
      const overlapping = await Booking.findOne({
        car: booking.car,
        status: "confirmed",
        startDate: { $lte: booking.endDate },
        endDate: { $gte: booking.startDate },
        _id: { $ne: booking._id },
      });
      if (overlapping) {
        return res.status(400).json({ message: "Car not available for selected dates" });
      }

      const carDetails = await Car.findById(booking.car);
      if (!carDetails) return res.status(404).json({ message: "Car not found" });

      const days = calculateDays(booking.startDate, booking.endDate);
      booking.payment.amount = days * carDetails.pricePerDay;
      booking.payment.status = "unpaid";
    }

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete booking (user deletes own, admin can delete any)
export const deleteBooking = async (req, res) => {
  try {
    const filter = req.user.role === "admin"
      ? { _id: req.params.id }
      : { _id: req.params.id, user: req.user._id };

    const booking = await Booking.findOneAndDelete(filter);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("car")
      .populate("user", "name email");
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching all bookings:", error);
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

    if (req.body.startDate || req.body.endDate) {
      if (new Date(booking.startDate) >= new Date(booking.endDate)) {
        return res.status(400).json({ message: "End date must be after start date" });
      }

      const carDetails = await Car.findById(booking.car);
      if (!carDetails) return res.status(404).json({ message: "Car not found" });

      const days = calculateDays(booking.startDate, booking.endDate);
      booking.payment.amount = days * carDetails.pricePerDay;
      booking.payment.status = "unpaid";
    }

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking (admin):", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const newStatus = req.body.status;

    //Admin can set any status
    if (req.user.role === "admin") {
      booking.status = newStatus || booking.status;
    } else {
      //User can only cancel their own pending bookings
      if (newStatus === "cancelled" && booking.user.toString() === req.user._id.toString()) {
        if (booking.status === "pending") {
          booking.status = "cancelled";
        } else {
          return res.status(400).json({ message: "Only pending bookings can be cancelled" });
        }
      } else {
        return res.status(403).json({ message: "Not authorized to change status" });
      }
    }

    const updated = await booking.save();
    res.json(updated);
  } catch (error) {
    console.error("Error updating booking status:", error);
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
    console.error("Error deleting booking (admin):", error);
    res.status(500).json({ message: "Server error" });
  }
};
