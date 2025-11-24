import express from "express";
import calorieEntriesRoute from "../routes/calorieEntries.js";

const router = express.Router();

router.use("/calorie-entries", calorieEntriesRoute);
router.use("/daily-calories", () => {});

export default router;
