import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// Create booking (user only)
export const createBooking = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("User from token:", req.user);

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

    // Fetch car details to get daily rate
    const carDetails = await Car.findById(carId);
    if (!carDetails) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Calculate number of days
    const days = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );

    // ✅ Use pricePerDay instead of dailyRate
    const totalCost = days * carDetails.pricePerDay;

    // Create booking with payment info
    const booking = await Booking.create({
      user: req.user._id,   // use _id from token
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
    console.log("Populated bookings:", JSON.stringify(bookings, null, 2));
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
      : { _id: req.params.id, user: req.user.id };

    const booking = await Booking.findOne(filter);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Update dates if provided
    if (req.body.startDate) booking.startDate = req.body.startDate;
    if (req.body.endDate) booking.endDate = req.body.endDate;

    // If dates changed, recalculate payment amount
    if (req.body.startDate || req.body.endDate) {
      const carDetails = await Car.findById(booking.car);
      if (!carDetails) {
        return res.status(404).json({ message: "Car not found" });
      }

      // Validate new dates
      if (new Date(booking.startDate) >= new Date(booking.endDate)) {
        return res.status(400).json({ message: "End date must be after start date" });
      }

      const days = Math.ceil(
        (new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24)
      );

      booking.payment.amount = days * carDetails.dailyRate;
      booking.payment.status = "unpaid"; // reset if dates change
    }

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

//Admin: update booking status

export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = req.body.status || booking.status;
    const updated = await booking.save();

    res.json(updated);
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