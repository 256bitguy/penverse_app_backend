import express from "express";
import {
  createEditorial,
  getEditorialById,
  getEditorialsByDate,
  searchEditorialByTitle,
  updateEditorial,
  deleteEditorial
} from "../controllers/editorials.controller.js";

const router = express.Router();

// CRUD
router.post("/", createEditorial);
router.get("/:id", getEditorialById);
router.get("/date/:date", getEditorialsByDate);
router.get("/search", searchEditorialByTitle);
router.put("/:id", updateEditorial);
router.delete("/:id", deleteEditorial);

export default router;
