import Note from "../models/notes.model.js";

// Create a new note
export const createNote = async (req, res) => {
  try {
    const noteData = req.body;

    // Validate required field
    if (!noteData.topicId) {
      return res.status(400).json({ message: "topicId is required" });
    }

    // Check if a note already exists for this topicId
    const existingNote = await Note.findOne({ topicId: noteData.topicId });
    if (existingNote) {
      return res.status(400).json({
        message: "A note for this topic already exists",
        existingNote,
      });
    }

    // Create a new note if no existing one found
    const note = new Note(noteData);
    await note.save();

    res.status(201).json({
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    console.error("❌ Create Note Error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all notes by topicId
export const getNotesByTopicId = async (req, res) => {
  try {
    const { topicId } = req.params;
    const notes = await Note.find({ topicId }).sort({ createdAt: -1 });
    if (!notes.length) return res.status(404).json({ message: "No notes found for this topic" });
    res.status(200).json({data:notes});
  } catch (error) {
    console.error("❌ Get Notes by Topic Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get single note by its own id
export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    console.error("❌ Get Note Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update note by id
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const noteData = req.body;
    const note = await Note.findByIdAndUpdate(id, noteData, { new: true });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note updated successfully", note });
  } catch (error) {
    console.error("❌ Update Note Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete note by id
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndDelete(id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("❌ Delete Note Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
