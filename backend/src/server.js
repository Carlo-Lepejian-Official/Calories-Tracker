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

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to Database!");
} catch (error) {
  console.error("Error while connecting to database: ", error);
  process.exit(1);
}

app.get("/api", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);

  const user = await clerkClient.users.getUser(userId);

  console.log(user);
  res.send("You are authenticated!!");
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
