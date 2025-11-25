import express from "express";
import {
  clerkClient,
  clerkMiddleware,
  getAuth,
  requireAuth,
} from "@clerk/express";
import apiRoutes from "./middleware/apiRoutes.js";
import ensureUserExists from "./middleware/ensureUserExists.js";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const PORT = 3000;

mongoose.connect(process.env.MONGODB_URI);
app.use("/api", requireAuth(), ensureUserExists, apiRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
