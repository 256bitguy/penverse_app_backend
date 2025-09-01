import express from "express";
import {
  createAwareness,
  getAwareness,
  getAwarenessById,
  updateAwareness,
  deleteAwareness,
} from "../controllers/awareness.controller.js";

const router = express.Router();

router.post("/", createAwareness);        // Create
router.get("/", getAwareness);            // Read all (with filters)
router.get("/:id", getAwarenessById);     // Read single
router.put("/:id", updateAwareness);      // Update
router.delete("/:id", deleteAwareness);   // Delete

export default router;
