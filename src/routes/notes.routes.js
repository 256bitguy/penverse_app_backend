import express from "express";
import {
  createNote,
  getNotesByTopicId,
  getNoteById,
  updateNote,
  deleteNote
} from "../controllers/notes.controller.js";

const router = express.Router();

// Create note
router.post("/", createNote);

// Get all notes by topicId
router.get("/topic/:topicId", getNotesByTopicId);

// Get single note by its own id
router.get("/:id", getNoteById);

// Update note by id
router.put("/:id", updateNote);

// Delete note by id
router.delete("/:id", deleteNote);

export default router;
