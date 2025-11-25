import { clerkClient, getAuth } from "@clerk/express";
import express from "express";
import CalorieEntry from "../schemas/CalorieEntry.js";

const router = express.Router();

router.get("/", async (req, res) => {
  return res.send("Entries:");
});

router.post("/", async (req, res) => {
  const userId = req.userId;
  const calories = req.body.calories;

  try {
    const newCalorieEntry = new CalorieEntry({
      userId,
      calories,
    });

    newCalorieEntry.save();
    return res.status(200).json({ message: "Successfully added entry!" });
  } catch (error) {
    console.error("Couldn't add entry: ", error);
    return res.status(500).json({ error: "Couldn't add entry" });
  }
});

export default router;
