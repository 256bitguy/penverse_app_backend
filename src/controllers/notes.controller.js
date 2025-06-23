import { Note } from "../models/notes.model.js";
import { asynchandler } from "../utils/asynchandler.js";

// GET /notes/:topicId
const getNotesByTopic = asynchandler(async (req, res) => {
  const { topicId } = req.params;
  const notes = await Note.find({ topicId });
  res.status(200).json({ notes });
});

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
  updateNote,
  deleteNote,
};
