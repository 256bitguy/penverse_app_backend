// controllers/chapterController.js
import Chapter from "../models/chapter.models.js";

 
// controllers/chapterController.js
 
import Book from "../models/book.model.js";

export const createChapter = async (req, res) => {
  try {
    const { title, description, bookId } = req.body;

    // Validate required fields
    if (!title || !bookId) {
      return res.status(400).json({ message: "Title and Book ID are required" });
    }

    // Ensure the book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Optional: Check if a chapter with the same title already exists for this book
    const existingChapter = await Chapter.findOne({ bookId, title: title.trim() });
    if (existingChapter) {
      return res.status(400).json({ message: "A chapter with this title already exists in this book" });
    }

    // Create the chapter
    const chapter = new Chapter({
      title: title.trim(),
      description: description || "",
      bookId,
    });

    await chapter.save();

    // Increment totalChapters in Book
    book.totalChapters += 1;
    await book.save();

    res.status(201).json({
      message: "Chapter created successfully",
      chapter,
    });
  } catch (error) {
    console.error("❌ Create Chapter Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all chapters
// controllers/chapterController.js

// Get all chapters for a specific book
export const getChapters = async (req, res) => {
  try {
    const { bookId } = req.params; // Get bookId from URL params

    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    const chapters = await Chapter.find({ bookId }).populate("bookId", "title author");

    if (!chapters.length) {
      return res.status(404).json({ message: "No chapters found for this book" });
    }

    res.status(200).json({data:chapters});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a single chapter by ID
export const getChapterById = async (req, res) => {
  try {
    const { id } = req.params;
    const chapter = await Chapter.findById(id).populate("bookId", "title author");

    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a chapter
export const updateChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const chapter = await Chapter.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    res.status(200).json({ message: "Chapter updated successfully", chapter });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a chapter
export const deleteChapter = async (req, res) => {
  try {
    const { id } = req.params;

    const chapter = await Chapter.findByIdAndDelete(id);

    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    res.status(200).json({ message: "Chapter deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
