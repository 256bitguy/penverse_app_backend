import express from "express";
import {
  createDailyPhrase,
  getDailyPhraseByDate,
  updateDailyPhrase,
  deleteDailyPhrase,
} from "../controllers/dailyPhrasalVerbs.controller.js";

const router = express.Router();

router.post("/", createDailyPhrase);
router.get("/:date", getDailyPhraseByDate);
router.put("/:date", updateDailyPhrase);
router.delete("/:date", deleteDailyPhrase);

export default router;
