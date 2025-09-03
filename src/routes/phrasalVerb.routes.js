import express from "express";
import {
  createPhrasalVerb, getPhrasalVerbById, updatePhrasalVerb, deletePhrasalVerb,getPhrasalVerbsByTopicId
} from "../controllers/phrasalVerbs.controller.js";

const router = express.Router();
 
router.post("/", createPhrasalVerb);
router.get("/topic/:topicId", getPhrasalVerbsByTopicId);
router.get("/:id", getPhrasalVerbById);
router.put("/:id", updatePhrasalVerb);
router.delete("/:id", deletePhrasalVerb);

export default router;
