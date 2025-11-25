import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, indexed: true },
  dailyCalories: { type: Number, default: 2200 },
});

export default mongoose.model("User", userSchema, "Users");
