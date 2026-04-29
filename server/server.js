// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./db.js"; // DB connection
import path from "path";
import { fileURLToPath } from "url";
import open from "open";

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import API routes
import authRoutes from "./routes/auth.routes.js";
import biosphereRoutes from "./routes/biosphere.routes.js";
import newsRoutes from "./routes/news.routes.js";
import safariRoutes from "./routes/safari.routes.js";
import parkRoutes from "./routes/park.routes.js";
import censusRoutes from "./routes/census.routes.js";

// Import admin middleware
import isAdmin from "./middleware/admin.middleware.js";
import { verifyToken } from "./middleware/auth.middleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ---------------- STATIC FILES ----------------
// Serve everything inside public/ (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, "../public")));

// ---------------- API ROUTES ----------------
app.use("/api/auth", authRoutes);
app.use("/api/biosphere", biosphereRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/safari", safariRoutes);
app.use("/api/parks", parkRoutes);
app.use("/api/census", censusRoutes);

// ---------------- PAGE ROUTES ----------------
// Home
app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname,verifyToken, "../public/index.html"));
});

// Authentication pages
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

app.get("/admin-login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/Adminlogin.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

// Content pages
app.get("/biosphere", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/biosphere.html"));
});

app.get("/news", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/news.html"));
});

app.get("/jeepsafari", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/jeepsafari.html"));
});

app.get("/parks", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/nationalPark.html"));
});

app.get("/animalcensus", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/animalcensus.html"));
});

// Admin pages
app.get("/admin-dashboard", isAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/AdminDashboard.html"));
});

app.get("/admin-update", isAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin-update.html"));
});

// ---------------- DATABASE + SERVER ----------------
(async () => {
  try {
    await sequelize.authenticate();
    console.log(" MySQL connected");

    await sequelize.sync({ alter: true });
    console.log(" Models synchronized");

    const PORT = process.env.PORT || 8383; // use your chosen port
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`)
      open(`http://localhost:${PORT}/login`);
  });
  } catch (error) {
    console.error(" Database connection failed:", error);
  }
})();
