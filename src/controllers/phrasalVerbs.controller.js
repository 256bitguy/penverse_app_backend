import { PhrasalVerb } from "../models/phrasalVerb.model.js";

// CREATE a new Phrasal Verb
export const createPhrasalVerb = async (req, res) => {
  try {
    const { topicId, phrasalVerb, meaning, imageUrl, englishExplanation, hindiExplanation, examples } = req.body;
const existing = await PhrasalVerb.findOne({ phrasalVerb });
    if (existing) {
      return res.status(400).json({ error: "Phrasal verb already exists" });
    }
    // Just create, no duplicate check
    const newVerb = await PhrasalVerb.create({
      topicId,
      phrasalVerb,
      meaning,
      imageUrl,
      englishExplanation,
      hindiExplanation,
      examples,
    });

    res.status(201).json(newVerb);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// READ Phrasal Verb by ID

export const getPhrasalVerbById = async (req, res) => {
  try {
    const { id } = req.params;
    const verb = await PhrasalVerb.findById(id).populate("topicId");
    if (!verb) return res.status(404).json({ error: "Phrasal verb not found" });
    res.json(verb);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Phrasal Verb by ID 
export const updatePhrasalVerb = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedVerb = await PhrasalVerb.findByIdAndUpdate(
      id,
      { $set: { ...updates }, updatedAt: new Date() }, // ✅ Use $set
      { new: true, runValidators: true }
    ).populate("topicId");

    if (!updatedVerb) {
      return res.status(404).json({ error: "Phrasal verb not found" });
    }

    res.json(updatedVerb);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// UPDATE Phrasal Verb by ID 
export const getPhrasalVerbsByTopicId = async (req, res) => {
  try {
    const { topicId } = req.params;

    const verbs = await PhrasalVerb.find({ topicId }).populate("topicId");

    if (!verbs || verbs.length === 0) {
      return res.status(404).json({ error: "No phrasal verbs found for this topic" });
    }

    res.json(verbs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// DELETE Phrasal Verb by ID createPhrasalVerb getPhrasalVerbById updatePhrasalVerb deletePhrasalVerb
export const deletePhrasalVerb = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await PhrasalVerb.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Phrasal verb not found" });
    res.json({ message: "Phrasal verb deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
