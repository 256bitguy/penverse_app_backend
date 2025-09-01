import express from "express";
import {
  createDailyPhrase,
  getDailyPhraseByDate,
  updateDailyPhrase,
  deleteDailyPhrase,
} from "../controllers/dailyPhrasalVerbs.controller.js";

const router = express.Router();

// Create a new daily phrase
router.post("/", createDailyPhrase);

// Get daily phrase by date (format: YYYY-MM-DD)
router.get("/:date", getDailyPhraseByDate);

// Update daily phrase by date
router.put("/:date", updateDailyPhrase);

// Delete daily phrase by date
router.delete("/:date", deleteDailyPhrase);

export default router;
