import express from "express";
import calorieEntriesRoute from "../routes/calorieEntries.js";
import dailyCaloriesRoute from "../routes/dailyCalories.js";
import editCalorieEntry from "../routes/editCalorieEntry.js";

const router = express.Router();

router.use("/calorie-entries", calorieEntriesRoute);
router.use("/daily-calories", dailyCaloriesRoute);
router.use("/edit-calorie-entry", editCalorieEntry);

export default router;
