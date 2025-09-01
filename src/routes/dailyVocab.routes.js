import express from "express";
import {
  createDailyVocab,
  getDailyVocabByDate,
  updateDailyVocab,
  deleteDailyVocab,
} from "../controllers/dailyVocab.controller.js";

const router = express.Router();

// Create a new daily vocab
router.post("/", createDailyVocab);

// Get daily vocab by date (format: YYYY-MM-DD)
router.get("/:date", getDailyVocabByDate);

// Update daily vocab by date
router.put("/:date", updateDailyVocab);

// Delete daily vocab by date
router.delete("/:date", deleteDailyVocab);

export default router;
