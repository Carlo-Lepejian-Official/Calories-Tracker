import { clerkClient, getAuth } from "@clerk/express";
import express from "express";
import User from "../schemas/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  return res.send("Entries:");
});

export default router;
