import mongoose from "mongoose";
  import { Vocabulary } from "../models/vocabulary.model.js";
import { asynchandler } from "../utils/asynchandler.js";

const getAllVocabulary = asynchandler(async (req, res) => {
  const { topicId } = req.params;

  if (!topicId) {
    return res.status(400).json({ message: "topicId is required in params" });
  }

  const vocabulary =  await Vocabulary.find({ topicId });
  
  res.status(200).json({
vocabulary
  });
});
 
const getVocabularyByDate = async (req, res) => {
  try {
const userObjectId = new mongoose.Types.ObjectId(req.user._id);
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Missing required query: date (YYYY-MM-DD)" });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD." });
    }

    const startOfDay = new Date(parsedDate);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(parsedDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const vocabList = await Vocabulary.find({
      
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).sort({ createdAt: -1 });

    return res.status(200).json(vocabList);
  } catch (error) {
    console.error("Error in getVocabularyByDate:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

 
// POST /vocabulary/create — create a new vocabulary entry
const createVocabulary = asynchandler(async (req, res) => {
  const { word, topicId, explanation, synonyms, antonyms, fillingBlanks } = req.body;

  const requiredFields = ["word", "topicId", "explanation", "synonyms", "antonyms", "fillingBlanks"];
  const missingFields = requiredFields.filter(
    (field) => req.body[field] === undefined || req.body[field] === null || req.body[field] === ""
  );

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const newEntry = await Vocabulary.create({
    word,
    topicId,
    explanation,
    synonyms,
    antonyms,
    fillingBlanks,
  });

  res.status(201).json(newEntry);
});

// GET /vocabulary/:id — get vocabulary entry by ID
const getVocabularyById = asynchandler(async (req, res) => {
  const { id } = req.params;

  const entry = await Vocabulary.findById(id).populate("topicId", "name");
  if (!entry) {
    return res.status(404).json({ message: "Vocabulary entry not found" });
  }

  res.status(200).json(entry);
});

// PATCH /vocabulary/:id — update vocabulary entry by ID
const updateVocabulary = asynchandler(async (req, res) => {
  const { id } = req.params;

  const updatedEntry = await Vocabulary.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedEntry) {
    return res.status(404).json({ message: "Vocabulary entry not found or update failed" });
  }

  res.status(200).json(updatedEntry);
});

// DELETE /vocabulary/:id — delete vocabulary entry
const deleteVocabulary = asynchandler(async (req, res) => {
  const { id } = req.params;

  const deleted = await Vocabulary.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ message: "Vocabulary entry not found or delete failed" });
  }

  res.status(200).json({ message: "Vocabulary entry deleted successfully" });
});

export {
  getAllVocabulary,
  createVocabulary,
  getVocabularyById,
  updateVocabulary,
  deleteVocabulary,
  getVocabularyByDate
};
