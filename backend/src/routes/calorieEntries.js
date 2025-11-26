import { clerkClient, getAuth } from "@clerk/express";
import express from "express";
import CalorieEntry from "../schemas/CalorieEntry.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = req.user;
    const calorieEntries = await CalorieEntry.where({
      userId: user.uid,
    }).select("calories createdAt");
    return res.status(200).json({ calorieEntries });
  } catch (error) {
    return res.status(401).json({ error: "Couldn't get calorie entries" });
  }
});

router.post("/", async (req, res) => {
  const user = req.user;
  const calories = req.body.calories;

  try {
    const newCalorieEntry = new CalorieEntry({
      userId: user.uid,
      calories,
    });

    newCalorieEntry.save();
    return res.status(200).json({ calorieEntry: newCalorieEntry });
  } catch (error) {
    console.error("Couldn't add entry: ", error);
    return res.status(500).json({ error: "Couldn't add entry" });
  }
});

export default router;
