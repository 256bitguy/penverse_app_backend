 
import { DailyIdiom } from "../models/dailyIdioms.model.js"; 

// ✅ Create Daily Idiom
export const createDailyIdiom = async (req, res) => {
  try {
    const { date, list } = req.body;

    // ensure unique per date
    const existing = await DailyIdiom.findOne({ date });
    if (existing) {
      return res.status(400).json({ error: "Daily idiom already exists for this date" });
    }

    const newIdiom = await DailyIdiom.create({ date, list });
    res.status(201).json(new DailyIdiom);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Daily Idiom", details: error.message });
  }
};

// ✅ Get Daily Idiom by date
export const getDailyIdiomByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const dailyIdiom = await DailyIdiom.findOne({ date })
      .populate("list");  

    if (!dailyIdiom) {
      return res.status(404).json({ error: "No idioms found for this date" });
    }

    res.json(dailyIdiom);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Daily Idiom", details: error.message });
  }
};

// ✅ Update Daily Idiom
export const updateDailyIdiom = async (req, res) => {
  try {
    const { date } = req.params;
    const { list } = req.body;

    const updated = await DailyIdiom.findOneAndUpdate(
      { date },
      { list, updatedAt: new Date() },
      { new: true }
    ).populate("list");

    if (!updated) {
      return res.status(404).json({ error: "Daily idiom not found for this date" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update Daily Idiom", details: error.message });
  }
};

// ✅ Delete Daily Idiom
export const deleteDailyIdiom = async (req, res) => {
  try {
    const { date } = req.params;

    const deleted = await DailyIdiom.findOneAndDelete({ date });

    if (!deleted) {
      return res.status(404).json({ error: "Daily idiom not found for this date" });
    }

    res.json({ message: "Daily idiom deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Daily Idiom", details: error.message });
  }
};
