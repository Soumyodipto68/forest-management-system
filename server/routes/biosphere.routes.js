import { Router } from "express";
import {
  createBiosphere,
  getBiospheres,
  getBiosphere,
  updateBiosphere,
  deleteBiosphere
} from "../controllers/biosphere.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";
const router = Router();

r// Public routes
router.get("/", getBiospheres);
router.get("/:id", getBiosphere);

// Protected routes
router.post("/", verifyToken, createBiosphere);
router.put("/:id", verifyToken, updateBiosphere);
router.delete("/:id", verifyToken, deleteBiosphere);

export default router;
