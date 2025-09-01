import { Idiom } from "../models/idioms.model.js";

// CREATE a new Idiom
export const createIdiom = async (req, res) => {
  try {
    const { topicId, idiom, meaning, imageUrl, englishExplanation, hindiExplanation, examples } = req.body;

    // Check if idiom already exists
    const existing = await Idiom.findOne({ idiom });
    if (existing) {
      return res.status(400).json({ error: "Idiom already exists" });
    }

    const newIdiom = await Idiom.create({
      topicId,
      idiom,
      meaning,
      imageUrl,
      englishExplanation,
      hindiExplanation,
      examples,
    });

    res.status(201).json(newIdiom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ Idiom by ID
export const getIdiomById = async (req, res) => {
  try {
    const { id } = req.params;
    const idiom = await Idiom.findById(id).populate("topicId");
    if (!idiom) return res.status(404).json({ error: "Idiom not found" });
    res.json(idiom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Idiom by ID
export const updateIdiom = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedIdiom = await Idiom.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true }
    ).populate("topicId");

    if (!updatedIdiom) return res.status(404).json({ error: "Idiom not found" });
    res.json(updatedIdiom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Idiom by ID
export const deleteIdiom = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Idiom.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Idiom not found" });
    res.json({ message: "Idiom deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
