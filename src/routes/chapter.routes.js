// routes/chapterRoutes.js
import express from "express";
import {
  createChapter,
 getChapters,
  getChapterById,
  updateChapter,
  deleteChapter,
} from "../controllers/chapter.controller.js";

const router = express.Router();
getChapters
router.post("/", createChapter);      // Create a chapter
router.get("/book/:bookId", getChapters);       
router.get("/:id", getChapterById);   // Get a single chapter by ID
router.put("/:id", updateChapter);    // Update chapter by ID
router.delete("/:id", deleteChapter); // Delete chapter by ID

export default router;
