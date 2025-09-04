import express from "express";
import {
  createDailyIdiom,
  getDailyIdiomByDate,
  updateDailyIdiom,
  deleteDailyIdiom,
} from "../controllers/dailyIdioms.controller.js";

const router = express.Router();
 
router.post("/", createDailyIdiom);
router.get("/:date", getDailyIdiomByDate);
router.put("/:date", updateDailyIdiom);
router.delete("/:date", deleteDailyIdiom);

export default router;
