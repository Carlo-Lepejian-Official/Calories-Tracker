import { getAuth } from "@clerk/express";
import express from "express";
import User from "../schemas/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  // Find the user in the MongoDB database
  const user = await User.findOne({ userId: req.userId });
  return res.send(user.dailyCalories);
});

router.post("/", async (req, res) => {
  // Find the user in the MongoDB database
  const user = await User.findOne({ userId: req.userId });
  user.dailyCalories = req.body.dailyCalories;
  user.save();
  return res.send(user.dailyCalories);
});

export default router;
