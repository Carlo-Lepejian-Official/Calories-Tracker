import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  DailyCalories: { type: Number, default: 2200 },
});

export default mongoose.model("User", userSchema, "Users");
