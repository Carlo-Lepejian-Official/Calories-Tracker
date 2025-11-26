import { getAuth } from "firebase-admin/auth";
import User from "../schemas/User.js";

const validateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const user = await getAuth().verifyIdToken(token);
    await User.findOneAndUpdate({ userId: user.uid }, {}, { upsert: true });
    req.user = user;
    next();
  } catch (error) {
    console.error("Token is invalid", error);
    return res.status(401).json({ error: "Invalid Token" });
  }
};

export default validateUser;
