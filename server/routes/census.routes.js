import { Router } from "express";
import {
  createCensus,
  getCensus,
  getCensusRecord,
  updateCensus,
  deleteCensus
} from "../controllers/census.controllers.js";
import { verifyToken, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

// Public routes (anyone can view census data)
router.get("/", getCensus);
router.get("/:id", getCensusRecord);

// Admin-only routes (must be logged in with role=admin)
router.post("/", verifyToken, requireAdmin, createCensus);
router.put("/:id", verifyToken, requireAdmin, updateCensus);
router.delete("/:id", verifyToken, requireAdmin, deleteCensus);

export default router;
