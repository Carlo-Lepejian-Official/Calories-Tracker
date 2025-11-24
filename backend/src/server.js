import express from "express";
import {
  clerkClient,
  clerkMiddleware,
  getAuth,
  requireAuth,
} from "@clerk/express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const PORT = 3000;

mongoose.connect(process.env.MONGODB_URI);

app.get("/api", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);

  const user = await clerkClient.users.getUser(userId);

  console.log(user);
  res.send("You are authenticated!!");
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
