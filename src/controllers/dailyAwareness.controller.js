import { DailyAwareness } from "../models/dailyAwareness.model.js";

// ✅ Create Daily Awareness
export const createDailyAwareness = async (req, res) => {
  try {
    const { date, list } = req.body;

    const existing = await DailyAwareness.findOne({ date });
    if (existing) {
      return res.status(400).json({ error: "Daily awareness already exists for this date" });
    }

    const newDailyAwareness = await DailyAwareness.create({ date, list });
    res.status(201).json(newDailyAwareness);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Daily Awareness", details: error.message });
  }
};

// ✅ Get Daily Awareness by date
export const getDailyAwarenessByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const dailyAwareness = await DailyAwareness.findOne({ date })
      .populate("list"); // populate awareness items

    if (!dailyAwareness) {
      return res.status(404).json({ error: "No awareness items found for this date" });
    }

    res.json(dailyAwareness);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Daily Awareness", details: error.message });
  }
};

// ✅ Update Daily Awareness
export const updateDailyAwareness = async (req, res) => {
  try {
    const { date } = req.params;
    const { list } = req.body;

    const updated = await DailyAwareness.findOneAndUpdate(
      { date },
      { list, updatedAt: new Date() },
      { new: true }
    ).populate("list");

    if (!updated) {
      return res.status(404).json({ error: "Daily awareness not found for this date" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update Daily Awareness", details: error.message });
  }
};

// ✅ Delete Daily Awareness
export const deleteDailyAwareness = async (req, res) => {
  try {
    const { date } = req.params;

    const deleted = await DailyAwareness.findOneAndDelete({ date });

    if (!deleted) {
      return res.status(404).json({ error: "Daily awareness not found for this date" });
    }

    res.json({ message: "Daily awareness deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Daily Awareness", details: error.message });
  }
};
