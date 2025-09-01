import { DailyPhrase } from "../models/dailyPhrasalVerbs.model.js";

// Create
export const createDailyPhrase = async (req, res) => {
  try {
    const { date, list } = req.body;
    const existing = await DailyPhrase.findOne({ date });
    if (existing) return res.status(400).json({ error: "Already exists for this date" });
    const newDailyPhrase = await DailyPhrase.create({ date, list });
    res.status(201).json(newDailyPhrase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read by date
export const getDailyPhraseByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const dailyPhrase = await DailyPhrase.findOne({ date }).populate("list");
    if (!dailyPhrase) return res.status(404).json({ error: "No phrases for this date" });
    res.json(dailyPhrase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateDailyPhrase = async (req, res) => {
  try {
    const { date } = req.params;
    const { list } = req.body;
    const updated = await DailyPhrase.findOneAndUpdate(
      { date },
      { list, updatedAt: new Date() },
      { new: true }
    ).populate("list");
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
export const deleteDailyPhrase = async (req, res) => {
  try {
    const { date } = req.params;
    const deleted = await DailyPhrase.findOneAndDelete({ date });
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
