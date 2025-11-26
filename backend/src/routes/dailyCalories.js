import express from "express";
import User from "../schemas/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  // Find the user in the MongoDB database
  const user = await User.findOne({ userId: req.user.uid });
  return res.send(user.dailyCalories);
});

router.post("/", async (req, res) => {
  // Find the user in the MongoDB database
  const user = await User.findOne({ userId: req.user.uid });
  user.dailyCalories = req.body.dailyCalories;
  user.save();
  return res.status(200).send(user.dailyCalories);
});

export default router;
