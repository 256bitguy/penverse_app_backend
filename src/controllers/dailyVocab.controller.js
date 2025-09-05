import { DailyVocab } from "../models/dailyVocab.model.js";

// CREATE a new Daily Vocab entry
export const createDailyVocab = async (req, res) => {
  try {
    const { date, list } = req.body;

    // Check if an entry already exists for this date
    const existing = await DailyVocab.findOne({ date });
    if (existing) {
      return res.status(400).json({ error: "Daily vocab already exists for this date" });
    }

    const newDailyVocab = await DailyVocab.create({ date, list });
    res.status(201).json(newDailyVocab);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ Daily Vocab by date
export const getDailyVocabByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const dailyVocab = await DailyVocab.findOne({ date }).populate("list");

    if (!dailyVocab) {
      return res.status(404).json({ error: "No daily vocab found for this date" });
    }

    res.json({data:dailyVocab.list});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Daily Vocab by date
export const updateDailyVocab = async (req, res) => {
  try {
    const { date } = req.params;
    const { list } = req.body;

    const updatedDailyVocab = await DailyVocab.findOneAndUpdate(
      { date },
      { list, updatedAt: new Date() },
      { new: true }
    ).populate("list");

    if (!updatedDailyVocab) {
      return res.status(404).json({ error: "Daily vocab not found for this date" });
    }

    res.json(updatedDailyVocab);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Daily Vocab by date
export const deleteDailyVocab = async (req, res) => {
  try {
    const { date } = req.params;

    const deletedDailyVocab = await DailyVocab.findOneAndDelete({ date });

    if (!deletedDailyVocab) {
      return res.status(404).json({ error: "Daily vocab not found for this date" });
    }

    res.json({ message: "Daily vocab deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
