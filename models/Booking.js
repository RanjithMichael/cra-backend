import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    payment: {
      amount: { type: Number, required: true }, // total cost
      currency: { type: String, default: "USD" },
      method: { type: String, enum: ["card", "paypal", "upi"], default: "card" },
      transactionId: { type: String }, // from Stripe/PayPal/etc.
      status: {
        type: String,
        enum: ["unpaid", "paid", "failed", "refunded"],
        default: "unpaid",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
