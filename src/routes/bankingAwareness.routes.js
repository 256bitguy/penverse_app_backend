import express from "express";
import {
  createAwareness,
  getAwarenessById,
  getAwarenessList,
  searchAwarenessByTitle,
  updateAwarenessById,
  deleteAwarenessById,
} from "../controllers/bankingAwareness.controller.js";

const router = express.Router();

// CREATE a new Awareness item
// POST /api/awareness
router.post("/", createAwareness);

// GET a single Awareness item by ID
// GET /api/awareness/:id
router.get("/:id", getAwarenessById);

// GET list of Awareness items (filter by topicId or date)
// GET /api/awareness?topicId=...&date=...
router.get("/topic/:topicid", getAwarenessList);

// SEARCH Awareness by title
// GET /api/awareness/search?title=...
router.get("/search/title", searchAwarenessByTitle);

// UPDATE an Awareness item by ID
// PUT /api/awareness/:id
router.put("/:id", updateAwarenessById);

// DELETE an Awareness item by ID
// DELETE /api/awareness/:id
router.delete("/:id", deleteAwarenessById);

export default router;
