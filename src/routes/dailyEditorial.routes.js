import express from "express";
import {
  createDailyEditorial,
  getDailyEditorialByDate,
  updateDailyEditorial,
  deleteDailyEditorial,
} from "../controllers/dailyEditorials.controller.js";

const router = express.Router();

// Create Daily Editorial
router.post("/", createDailyEditorial);

// Get Daily Editorial by date
router.get("/:date", getDailyEditorialByDate);

// Update Daily Editorial by date
router.put("/:date", updateDailyEditorial);

// Delete Daily Editorial by date
router.delete("/:date", deleteDailyEditorial);

export default router;
