import { Vocabulary } from "../models/vocabulary.model.js";
import mongoose from "mongoose";

// ✅ Create a new vocabulary word
export const createVocabulary = async (req, res) => {
  try {
  const vocab = new Vocabulary(req.body);
  await vocab.save();
  res.status(201).json(vocab);
} catch (err) {
  if (err.code === 11000) {
    // MongoDB duplicate key error
    res.status(400).json({ error: "This word already exists." });
  } else {
    res.status(500).json({ error: err.message });
  }
}
};

// ✅ Get all vocabulary words
export const getAllVocabularies = async (req, res) => {
  try {
    const vocabs = await Vocabulary.find().populate("topicId");
    res.json(vocabs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// by topicID
export const getVocabularyByTopic = async (req, res) => {
  try {
    const { topicid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(topicid)) {
      return res.status(400).json({ error: "Invalid Topic ID" });
    }

    const vocabList = await Vocabulary.find({ topicId: topicid }).populate("topicId");
    
    if (!vocabList || vocabList.length === 0) {
      return res.status(404).json({ error: "No vocabulary found for this topic" });
    }

    res.json({data : vocabList});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get vocabulary by ID
export const getVocabularyById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid ID" });

    const vocab = await Vocabulary.findById(id).populate("topicId");
    if (!vocab) return res.status(404).json({ error: "Vocabulary not found" });
    res.json(vocab);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update vocabulary by ID
export const updateVocabulary = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid ID" });

    const updatedVocab = await Vocabulary.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedVocab)
      return res.status(404).json({ error: "Vocabulary not found" });

    res.json(updatedVocab);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Delete vocabulary by ID
export const deleteVocabulary = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid ID" });

    const deletedVocab = await Vocabulary.findByIdAndDelete(id);
    if (!deletedVocab)
      return res.status(404).json({ error: "Vocabulary not found" });

    res.json({ message: "Vocabulary deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Search vocabulary by word, synonym, or antonym
export const searchVocabulary = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res
        .status(400)
        .json({ error: "Query parameter 'query' is required" });
    }

    // 1️⃣ Exact text search (word + hinglish)
    const textResults = await Vocabulary.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(10)
      .populate({ path: "topicId", strictPopulate: false }); // 👈 avoids "Invalid ID"

    // 2️⃣ Regex search for partial matches
    const regex = new RegExp(query, "i"); // case-insensitive
    const regexResults = await Vocabulary.find({
      $or: [{ word: regex }, { hinglish: regex }],
    })
      .limit(10)
      .populate({ path: "topicId", strictPopulate: false });

    // 3️⃣ Merge results (avoid duplicates by _id)
    const combined = [
      ...textResults,
      ...regexResults.filter(
        (doc) => !textResults.some((t) => t._id.equals(doc._id))
      ),
    ].slice(0, 10); // ✅ only send 10 max

    res.json(combined);
  } catch (err) {
    console.error("❌ Search error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
