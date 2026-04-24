// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./db.js"; // DB connection
import path from "path";
import { fileURLToPath } from "url";

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
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// User pages
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
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

app.get("/safari", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/safari.html"));
});

app.get("/parks", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/parks.html"));
});

app.get("/animalcensus", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/animalcensus.html"));
});

// Admin pages
app.get("/admin-dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin-dashboard.html"));
});

app.get("/admin-update", (req, res) => {
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
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  } catch (error) {
    console.error(" Database connection failed:", error);
  }
})();
