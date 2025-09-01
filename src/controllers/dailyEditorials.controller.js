import { DailyEditorial } from "../models/dailyEditorial.model.js";

// ✅ Create Daily Editorial
export const createDailyEditorial = async (req, res) => {
  try {
    const { date, list } = req.body;

    const existing = await DailyEditorial.findOne({ date });
    if (existing) {
      return res.status(400).json({ error: "Daily editorial already exists for this date" });
    }

    const newDailyEditorial = await DailyEditorial.create({ date, list });
    res.status(201).json(newDailyEditorial);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Daily Editorial", details: error.message });
  }
};

// ✅ Get Daily Editorial by date
export const getDailyEditorialByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const dailyEditorial = await DailyEditorial.findOne({ date })
      .populate("list"); // populate editorial items

    if (!dailyEditorial) {
      return res.status(404).json({ error: "No editorial items found for this date" });
    }

    res.json(dailyEditorial);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Daily Editorial", details: error.message });
  }
};

// ✅ Update Daily Editorial
export const updateDailyEditorial = async (req, res) => {
  try {
    const { date } = req.params;
    const { list } = req.body;

    const updated = await DailyEditorial.findOneAndUpdate(
      { date },
      { list, updatedAt: new Date() },
      { new: true }
    ).populate("list");

    if (!updated) {
      return res.status(404).json({ error: "Daily editorial not found for this date" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update Daily Editorial", details: error.message });
  }
};

// ✅ Delete Daily Editorial
export const deleteDailyEditorial = async (req, res) => {
  try {
    const { date } = req.params;

    const deleted = await DailyEditorial.findOneAndDelete({ date });

    if (!deleted) {
      return res.status(404).json({ error: "Daily editorial not found for this date" });
    }

    res.json({ message: "Daily editorial deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Daily Editorial", details: error.message });
  }
};
