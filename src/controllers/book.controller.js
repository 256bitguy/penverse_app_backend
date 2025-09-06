import Book from "../models/book.model.js";
import Subject from "../models/subject.model.js";

/**
 * @desc    Create a new Book and link to subject
 * @route   POST /api/books
 */
export const createBook = async (req, res) => {
  try {
    const { title, description, author, subjectId } = req.body;

    // Ensure subject exists
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Create the book
    const book = new Book({ title, description, author, subjectId });
    await book.save();

    // Increment totalBooks in Subject
    subject.totalBooks += 1;
    await subject.save();

    res.status(201).json({ message: "Book created successfully", book });
  } catch (error) {
    console.error("❌ Create Book Error:", error);
    res.status(500).json({ message: "Failed to create book", error });
  }
};

/**
 * @desc    Get all books (filter by subjectId)
 * @route   GET /api/books
 */
export const getAllBooks = async (req, res) => {
 
  try {
    const { subjectId } = req.params; // Get subjectId from URL params

    if (!subjectId) {
      return res.status(400).json({ message: "Subject ID is required" });
    }

    // Directly query MongoDB using the indexed field
    const books = await Book.find({ subjectId })
      .populate("subjectId", "name") // Include subject name
      .sort({ createdAt: -1 }); // Optional: newest first

    if (!books.length) {
      return res.status(404).json({ message: "No books found for this subject" });
    }

    res.status(200).json({data:books});
  } catch (error) {
    console.error("❌ Get Books by Subject Error:", error);
    res.status(500).json({ message: "Failed to fetch books", error: error.message });
  }
};

/**
 * @desc    Get a single book by ID
 * @route   GET /api/books/:id
 */
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("subjectId", "name");
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json(book);
  } catch (error) {
    console.error("❌ Get Book By ID Error:", error);
    res.status(500).json({ message: "Failed to fetch book", error });
  }
};

/**
 * @desc    Update book details
 * @route   PUT /api/books/:id
 */
export const updateBook = async (req, res) => {
  try {
    const { title, description, author } = req.body;

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.title = title || book.title;
    book.description = description || book.description;
    book.author = author || book.author;

    await book.save();
    res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    console.error("❌ Update Book Error:", error);
    res.status(500).json({ message: "Failed to update book", error });
  }
};

/**
 * @desc    Delete a book and decrement subject totalBooks
 * @route   DELETE /api/books/:id
 */
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Decrement totalBooks in Subject
    const subject = await Subject.findById(book.subjectId);
    if (subject) {
      subject.totalBooks -= 1;
      await subject.save();
    }

    await book.deleteOne();
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("❌ Delete Book Error:", error);
    res.status(500).json({ message: "Failed to delete book", error });
  }
};
