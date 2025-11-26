import express from "express";
import CalorieEntry from "../schemas/CalorieEntry.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const entryId = req.body.entryId;
    const changeTo = req.body.changeTo;
    const caloryEntry = await CalorieEntry.findOne({
      userId: req.user.uid,
      _id: entryId,
    });

    caloryEntry.calories = req.body.changeTo;
    await caloryEntry.save();
    return res.status(200).json({ message: "Saved!" });
  } catch (error) {
    console.error("Couldn't edit entry. ", error);
    return res.status(401).json({ error: "Couldn't edit entry" });
  }
});

export default router;
