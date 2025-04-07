// const FORNTEND_BASE_URL = "http://localhost:5173";

import dotenv from "dotenv";

dotenv.config();

const FORNTEND_BASE_URL = process.env.FRONTEND_BASE_URL || "https://chat-forntent.onrender.com";

export default FORNTEND_BASE_URL;