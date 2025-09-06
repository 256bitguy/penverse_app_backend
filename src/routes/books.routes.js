import express from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";

const router = express.Router();

router.post("/", createBook);         // Create
router.get("/", getAllBooks);         // Read all (filter by subjectId optional)
router.get("/:id", getBookById);      // Read one
router.put("/:id", updateBook);       // Update
router.delete("/:id", deleteBook);    // Delete

export default router;
