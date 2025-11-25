import express from "express";
import User from "../schemas/User.js";
import { getAuth } from "@clerk/express";

const router = express.Router();

router.use(async (req, res, next) => {
  // Get the user's UserId
  const { userId } = getAuth(req);

  if (!userId) {
    res.status(401).json({ error: "User Unauthorised" });
  }

  try {
    await User.findOneAndUpdate({ userId }, {}, { upsert: true });
    req.userId = userId;
    next();
  } catch (error) {
    console.error("Failed at ensuring user exists: ", error);
    res.status(500).json({ error: "Database Error" });
  }
});

export default router;
