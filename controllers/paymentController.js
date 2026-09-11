import Booking from "../models/Booking.js";

// Payment webhook (Stripe example)
export const paymentWebhook = async (req, res) => {
  try {
    const event = req.body; // Stripe sends event payload

    if (event.type === "payment_intent.succeeded") {
      const bookingId = event.data.object.metadata.bookingId;

      const booking = await Booking.findById(bookingId);
      if (booking) {
        booking.status = "confirmed";
        await booking.save();
      }
    }

    if (event.type === "payment_intent.payment_failed") {
      const bookingId = event.data.object.metadata.bookingId;

      const booking = await Booking.findById(bookingId);
      if (booking) {
        booking.status = "cancelled";
        await booking.save();
      }
    }

    res.json({ received: true });
  } catch (error) {
    res.status(500).json({ message: "Webhook error" });
  }
};
