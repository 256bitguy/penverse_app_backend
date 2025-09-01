import express from "express";
import {
  createDailyAwareness,
  getDailyAwarenessByDate,
  updateDailyAwareness,
  deleteDailyAwareness,
} from "../controllers/dailyAwareness.controller.js";

const router = express.Router();

// Create Daily Awareness
router.post("/", createDailyAwareness);

// Get Daily Awareness by date
router.get("/:date", getDailyAwarenessByDate);

// Update Daily Awareness by date
router.put("/:date", updateDailyAwareness);

// Delete Daily Awareness by date
router.delete("/:date", deleteDailyAwareness);

export default router;
