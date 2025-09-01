import express from "express";
import {
  createIdiom,
  getIdiomById,
  updateIdiom,
  deleteIdiom,
//   searchIdioms,
} from "../controllers/idioms.controller.js";

const router = express.Router();

router.post("/", createIdiom);
router.get("/:id", getIdiomById);
router.put("/:id", updateIdiom);
router.delete("/:id", deleteIdiom);
// router.get("/search", searchIdioms);

export default router;
