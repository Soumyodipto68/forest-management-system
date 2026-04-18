// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./db.js";
import User from "./models/user.models.js"

// Import routes
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
app.use(express.static("public"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/biosphere", biosphereRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/safari", safariRoutes);
app.use("/api/parks", parkRoutes);
app.use("/api/census", censusRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected");

    // Sync all models (creates/updates tables)
    await sequelize.sync({ alter: true });
    console.log("Models synchronized");

    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();
