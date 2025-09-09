import express from "express";
import {
  getQuestions,
  createQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questions.controller.js";

const router = express.Router();

// GET all questions
router.get("/topic/:topicid", getQuestions);

// POST create question
router.post("/", createQuestion);

// GET single question
router.get("/:id", getQuestionById);

// PUT update
router.put("/:id", updateQuestion);

// DELETE remove
router.delete("/:id", deleteQuestion);

export default router;
