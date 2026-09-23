import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    make: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 2000 },
    pricePerDay: { type: Number, required: true, min: 1 },
    available: { type: Boolean, default: true },

    category: {
      type: String,
      enum: ["Sedan", "SUV", "Hatchback", "Luxury", "MPV", "Electric", "Budget"],
      default: "Sedan",
    },

    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
      required: true,
    },

    seats: {
      type: Number,
      required: true,
      min: 2, // minimum 2 seats (like a coupe)
      max: 9, // maximum typical rental capacity (SUV/MPV)
    },

    image: {
      url: { type: String },
      public_id: { type: String },
    },

    description: { type: String, trim: true },

    
    isPopular: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Car", CarSchema);

