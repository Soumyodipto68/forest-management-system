import { Router } from "express";
import {
  createSafari,
  getSafaris,
  getSafari,
  updateSafari,
  deleteSafari
} from "../controllers/safariController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

// Public
router.get("/", getSafaris);
router.get("/:id", getSafari);

// Protected
router.post("/", verifyToken, createSafari);
router.put("/:id", verifyToken, updateSafari);
router.delete("/:id", verifyToken, deleteSafari);

export default router;
