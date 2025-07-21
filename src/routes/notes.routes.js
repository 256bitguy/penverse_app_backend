import express from "express";
import {
  getNotesByTopic,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
  getNotesByDate,
} from "../controllers/notes.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(verifyJWT);

router.route("/by-date").get(getNotesByDate);
router.route("/topic/:topicId").get(getNotesByTopic);
router.route("/publish").post(createNote);
router.route("/:id").get(getNoteById).patch(updateNote).delete(deleteNote);

export default router;
