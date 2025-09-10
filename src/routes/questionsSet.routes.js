import express from "express";
import {
  createQuestionSet,
  getAllQuestionSets,
  getQuizById,
  getQuestionSetsByTopic,
  updateQuestionSet,
  deleteQuestionSet
} from "../controllers/questionSet.controller.js";

const router = express.Router();

// Create a new Question Set
router.post("/", createQuestionSet);

// Get all Question Sets
router.get("/", getAllQuestionSets);

// Get a single Question Set by ID
router.get("/:quizId", getQuizById);

// Get all Question Sets for a specific topic
router.get("/topic/:topicId", getQuestionSetsByTopic);

// Update a Question Set by ID
router.put("/:id", updateQuestionSet);

// Delete a Question Set by ID
router.delete("/:id", deleteQuestionSet);

export default router;
