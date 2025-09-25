import express from "express";
import {
  createVocabulary,
  getVocabularyByTopic,
  getVocabularyById,
  updateVocabulary,
  deleteVocabulary,
  searchVocabulary,
} from "../controllers/vocabulary.controller.js";

const router = express.Router();

// CRUD routes
router.post("/", createVocabulary);             // Create
router.get("/topic/:topicid", getVocabularyByTopic);           // Read all
router.get("/:id", getVocabularyById);         // Read one
router.put("/:id", updateVocabulary);          // Update
router.delete("/:id", deleteVocabulary);  
 

router.get("/search", searchVocabulary); // ?query=word

export default router;
