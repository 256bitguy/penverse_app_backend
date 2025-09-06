import express from "express";
import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from "../controllers/subject.controller.js";

const router = express.Router();

router.post("/", createSubject);       // Create
router.get("/", getAllSubjects);       // Read all
router.get("/:id", getSubjectById);    // Read one
router.put("/:id", updateSubject);     // Update
router.delete("/:id", deleteSubject);  // Delete

export default router;
