import mongoose from "mongoose";

const calorieEntrySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    date: { type: Date, required: true },
    calories: { type: Number, required: true, min: 1, max: 10000 },
  },
  { timestamps: true }
);

export default mongoose.model(
  "CalorieEntry",
  calorieEntrySchema,
  "CalorieEntries"
);
