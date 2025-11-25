import express from "express";
import calorieEntriesRoute from "../routes/calorieEntries.js";
import dailyCaloriesRoute from "../routes/dailyCalories.js";

const router = express.Router();

router.use("/calorie-entries", calorieEntriesRoute);
router.use("/daily-calories", dailyCaloriesRoute);

export default router;
