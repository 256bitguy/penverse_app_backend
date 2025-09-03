import express from "express";
import {
  createDailyPhrase,
  getDailyPhraseByDate,
  updateDailyPhrase,
  deleteDailyPhrase,
} from "../controllers/dailyPhrasalVerbs.controller.js";

const router = express.Router();

// ✅ Create a daily phrasal verbs list
router.post("/", createDailyPhrase);

// ✅ Get a daily phrasal verbs list by date
router.get("/:date", getDailyPhraseByDate);

// ✅ Update a daily phrasal verbs list by date
router.put("/:date", updateDailyPhrase);

// ✅ Delete a daily phrasal verbs list by date
router.delete("/:date", deleteDailyPhrase);

export default router;
