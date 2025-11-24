import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, indexed: true },
  DailyCalories: { type: Number, default: 2200 },
});

export default mongoose.model("User", userSchema, "Users");
