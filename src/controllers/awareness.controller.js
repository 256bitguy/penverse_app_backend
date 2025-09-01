import { Awareness } from "../models/awareness.model.js"; // adjust path as needed

// ✅ CREATE
export const createAwareness = async (req, res) => {
  try {
    const awareness = new Awareness(req.body); // body should contain all fields
    await awareness.save();
    res.status(201).json({ success: true, data: awareness });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ READ (all or by filter)
export const getAwareness = async (req, res) => {
  try {
    const { date, type } = req.query; // optional filters
    const filter = {};
    if (date) filter.date = date;
    if (type) filter.type = type;

    const awarenessItems = await Awareness.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: awarenessItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ READ (by id)
export const getAwarenessById = async (req, res) => {
  try {
    const awareness = await Awareness.findById(req.params.id);
    if (!awareness) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.status(200).json({ success: true, data: awareness });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ UPDATE
export const updateAwareness = async (req, res) => {
  try {
    const awareness = await Awareness.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!awareness) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.status(200).json({ success: true, data: awareness });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ DELETE
export const deleteAwareness = async (req, res) => {
  try {
    const awareness = await Awareness.findByIdAndDelete(req.params.id);
    if (!awareness) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
