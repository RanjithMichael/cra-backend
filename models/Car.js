import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    make: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 2000 },
    pricePerDay: { type: Number, required: true, min: 1 },
    available: { type: Boolean, default: true },
    image: { type: String, default: "" },
    category: { type: String, enum: ["SUV", "Sedan", "Hatchback", "Luxury"], default: "Sedan" },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Car", CarSchema);

