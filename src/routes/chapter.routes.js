import { Router } from "express";

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
// router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

import express from "express";
import {
  publishAChapter,
  getAllChaptersBySubject,
  getChapterById,
  updateChapterById,
  deleteChapterById,
} from "../controllers/chapter.controller.js";

// Create a new chapter
router.post("/", publishAChapter);

// Get all chapters by subject
router.get("/subject/:subjectId", getAllChaptersBySubject);

// Get a single chapter by ID
router.get("/:chapterId", getChapterById);

// Update a chapter by ID
router.put("/:chapterId", updateChapterById);

// Delete a chapter by ID
router.delete("/:chapterId", deleteChapterById);

export default router;
