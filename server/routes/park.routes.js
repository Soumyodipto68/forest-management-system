import { Router } from "express";
import {
  createPark,
  getParks,
  getPark,
  updatePark,
  deletePark
} from "../controllers/parkController.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

// Public
router.get("/", getParks);
router.get("/:id", getPark);

// Protected
router.post("/", verifyToken, createPark);
router.put("/:id", verifyToken, updatePark);
router.delete("/:id", verifyToken, deletePark);

export default router;
