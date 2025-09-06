import express from "express";
import {
  createDailyBankingAwareness,
  getDailyBankingAwarenessByDate,
  updateDailyBankingAwareness,
  deleteDailyBankingAwareness,
} from "../controllers/dailyBankingAwareness.controller.js";

const router = express.Router();

// Create Daily Awareness
router.post("/", createDailyBankingAwareness);

// Get Daily Awareness by date
router.get("/:date", getDailyBankingAwarenessByDate);

// Update Daily Awareness by date
router.put("/:date", updateDailyBankingAwareness);

// Delete Daily Awareness by date
router.delete("/:date", deleteDailyBankingAwareness);

export default router;
