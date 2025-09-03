import { Editorial } from "../models/editorial.model.js";

// CREATE Editorial Item
export const createEditorial = async (req, res) => {
  try {
    const { title, paragraph, questions, date } = req.body;

    const existing = await Editorial.findOne({ title, date });
    if (existing) {
      return res.status(400).json({ error: "Editorial already exists for this title & date" });
    }

    const editorial = await Editorial.create({ title, paragraph, questions, date });
    res.status(201).json(editorial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single Editorial by ID
export const getEditorialById = async (req, res) => {
  try {
    const { id } = req.params;
    const editorial = await Editorial.findById(id);
    if (!editorial) return res.status(404).json({ error: "Editorial not found" });
    res.json(editorial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET Editorials by date
export const getEditorialsByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const editorials = await Editorial.find({ date });
    if (!editorials.length) return res.status(404).json({ error: "No editorials found for this date" });
    res.json(editorials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SEARCH by title
export const searchEditorialByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const editorials = await Editorial.find({ title: { $regex: title, $options: "i" } });
    res.json(editorials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Editorial by ID
export const updateEditorial = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Editorial.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Editorial not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Editorial by ID
export const deleteEditorial = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Editorial.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Editorial not found" });
    res.json({ message: "Editorial deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
