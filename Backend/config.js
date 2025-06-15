
import dotenv from "dotenv";

dotenv.config();

// const FORNTEND_BASE_URL = "http://localhost:5173";
// const FORNTEND_BASE_URL = process.env.FRONTEND_BASE_URL || "https://chat-forntent.onrender.com";
const FORNTEND_BASE_URL = [
  "https://chat-forntent.onrender.com", // your web frontend
  "capacitor://localhost",              // for Capacitor mobile apps
  "http://localhost",                   // for debugging locally
  "http://localhost:3000",               // local React frontend
  "http://localhost:5173"                // for local Vite frontend
];
export default FORNTEND_BASE_URL;
