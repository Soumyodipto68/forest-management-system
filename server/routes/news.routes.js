import { Router } from "express";
import {
  createNews,
  getNews,
  getSingleNews,
  updateNews,
  deleteNews
} from "../controllers/news.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

// Public
router.get("/", getNews);
router.get("/:id", getSingleNews);

// Protected
router.post("/", verifyToken, createNews);
router.put("/:id", verifyToken, updateNews);
router.delete("/:id", verifyToken, deleteNews);

export default router;
