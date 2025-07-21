import { Note } from "../models/notes.model.js";
import { asynchandler } from "../utils/asynchandler.js";

// GET /notes/:topicId
const getNotesByTopic = asynchandler(async (req, res) => {
  const { topicId } = req.params;
  const notes = await Note.find({ topicId });
  res.status(200).json({ notes });
});

 const getNotesByDate = async (req, res) => {
  try {
    const userId = req.user._id; // From JWT middleware
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date query is required (YYYY-MM-DD)" });
    }

    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const notes = await Note.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes by date", error: err.message });
  }
};
// POST /notes
const createNote = asynchandler(async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
});

// GET /note/:id
const getNoteById = asynchandler(async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  if (!note) return res.status(404).json({ message: "Not found" });
  res.status(200).json(note);
});

// PATCH /note/:id
const updateNote = asynchandler(async (req, res) => {
  const { id } = req.params;
  const updated = await Note.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json(updated);
});

// DELETE /note/:id
const deleteNote = asynchandler(async (req, res) => {
  const { id } = req.params;
  await Note.findByIdAndDelete(id);
  res.status(200).json({ message: "Deleted" });
});

export {
  getNotesByTopic,
  createNote,
  getNoteById,
  getNotesByDate,
  updateNote,
  deleteNote,
};
