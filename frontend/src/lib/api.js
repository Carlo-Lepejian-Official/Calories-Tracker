import axios from "axios";
import { auth } from "./firebase";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await auth.currentUser.getIdToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
