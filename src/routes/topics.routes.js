// routes/topicRoutes.js
import express from "express";
import {
  createTopic,
  getTopics,
  getTopicById,
  getTopicsByChapter,
  updateTopic,
  deleteTopic,
} from "../controllers/topics.controller.js";

const router = express.Router();

router.post("/", createTopic);           // Create a topic
router.get("/", getTopics);              // Get all topics
router.get("/:id", getTopicById);        // Get a single topic by ID
router.get("/chapter/:chapterId", getTopicsByChapter); // Get topics by chapter
router.put("/:id", updateTopic);         // Update topic by ID
router.delete("/:id", deleteTopic);      // Delete topic by ID

export default router;
