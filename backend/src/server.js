import express from "express";
import apiRoutes from "./middleware/apiRoutes.js";
import mongoose from "mongoose";
import cors from "cors";
import admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import "dotenv/config";
import validateUser from "./middleware/validateUser.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "../..", "frontend", "dist");

initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_SERVICE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_SERVICE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_SERVICE_PRIVATE_KEY,
  }),
});

mongoose.connect(process.env.MONGODB_URI);

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

app.use(express.json());

app.use("/api", validateUser, apiRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(distPath));

  app.use("*path", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
