import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  createVocabulary,
  getAllVocabulary,
  getVocabularyById,
  updateVocabulary,
  deleteVocabulary,
  getVocabularyByDate,
} from "../controllers/vocabulary.controller.js";

const router = Router();
router.use(verifyJWT);
router.route("/by-date").get(getVocabularyByDate);

// POST /vocabulary/create — create new vocabulary
router.post("/publish", createVocabulary);
 
// GET /vocabulary/:id — get one vocab entry by ID
router.get("/:topicId", getAllVocabulary);
router.get("/:id", getVocabularyById);

// PATCH /vocabulary/:id — update vocab entry by ID
router.patch("/:id", updateVocabulary);

// DELETE /vocabulary/:id — delete vocab entry by ID
router.delete("/:id", deleteVocabulary);

export default router;
