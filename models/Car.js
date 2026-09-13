import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    make: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String, // store image URL
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Car", CarSchema);
