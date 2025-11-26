import express from "express";
import apiRoutes from "./middleware/apiRoutes.js";
import mongoose from "mongoose";
import cors from "cors";
import admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import "dotenv/config";
import validateUser from "./middleware/validateUser.js";

const app = express();
const PORT = 3000;
initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_SERVICE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_SERVICE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_SERVICE_PRIVATE_KEY,
  }),
});

mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());

app.use("/api", validateUser, apiRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
