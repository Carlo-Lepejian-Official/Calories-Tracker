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

    caloryEntry.calories = changeTo;
    await caloryEntry.save();
    return res.status(200).json({ message: "Saved!" });
  } catch (error) {
    console.error("Couldn't edit entry. ", error);
    return res.status(401).json({ error: "Couldn't edit entry" });
  }
});

router.delete("/:entryId", async (req, res) => {
  try {
    const entryId = req.params.entryId;
    await CalorieEntry.deleteOne({
      userId: req.user.uid,
      _id: entryId,
    });

    return res.status(200).json({ message: "Deleted entry!" });
  } catch (error) {
    console.error("Couldn't delete entry. ", error);
    return res.status(401).json({ error: "Couldn't delete entry" });
  }
});

export default router;
