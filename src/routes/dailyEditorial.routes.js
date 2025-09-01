import express from "express";
import {
  createDailyEditorial,
  getDailyEditorialByDate,
  updateDailyEditorial,
  deleteDailyEditorial,
} from "../controllers/dailyEditorials.controller.js";

const router = express.Router();

router.post("/", createDailyEditorial);
router.get("/:date", getDailyEditorialByDate);
router.put("/:date", updateDailyEditorial);
router.delete("/:date", deleteDailyEditorial);

export default router;
