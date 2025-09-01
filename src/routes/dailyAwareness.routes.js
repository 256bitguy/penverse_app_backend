import express from "express";
import {
  createDailyAwareness,
  getDailyAwarenessByDate,
  updateDailyAwareness,
  deleteDailyAwareness,
} from "../controllers/dailyAwareness.controller.js";

const router = express.Router();

router.post("/", createDailyAwareness);
router.get("/:date", getDailyAwarenessByDate);
router.put("/:date", updateDailyAwareness);
router.delete("/:date", deleteDailyAwareness);

export default router;
