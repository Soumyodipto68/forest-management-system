import { Router } from "express";
import {
  createBiosphere,
  getBiospheres,
  getBiosphere,
  updateBiosphere,
  deleteBiosphere
} from "../controllers/biosphere.controllers.js";

const router = Router();

router.post("/", createBiosphere);
router.get("/", getBiospheres);
router.get("/:id", getBiosphere);
router.put("/:id", updateBiosphere);
router.delete("/:id", deleteBiosphere);

export default router;
