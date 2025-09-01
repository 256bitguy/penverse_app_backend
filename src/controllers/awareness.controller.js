import { Awareness } from "../models/awareness.model.js";
import mongoose from "mongoose";

// CREATE Awareness Item (all fields)
export const createAwareness = async (req, res) => {
  try {
    const {
      topicId,
      imageUrl,
      title,
      date,
      type,
      backgroundContextTitle,
      backgroundContextPoints,
      topicTitle,
      subTopicTitles,
      keyHighlightsOfTopic,
      keyHighlightsTitle,
      consequencesTitle,
      subTopicConsequencesTitle,
      conclusionPoints,
      importantPoints,
      questions,
    } = req.body;

    // Validate required fields
    if (!title || !date || !type) {
      return res
        .status(400)
        .json({ error: "Missing required fields: title, date, or type" });
    }

    

    const newItem = await Awareness.create({
      topicId: topicId || null,
      imageUrl: imageUrl || null,
      title,
      date,
      type,
      backgroundContextTitle: backgroundContextTitle || null,
      backgroundContextPoints: backgroundContextPoints || [],
      topicTitle: topicTitle || null,
      subTopicTitles: subTopicTitles || [],
      keyHighlightsOfTopic: keyHighlightsOfTopic || null,
      keyHighlightsTitle: keyHighlightsTitle || [],
      consequencesTitle: consequencesTitle || null,
      subTopicConsequencesTitle: subTopicConsequencesTitle || [],
      conclusionPoints: conclusionPoints || [],
      importantPoints: importantPoints || [],
      questions: questions || [],
    });

    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET single Awareness by ID
export const getAwarenessById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid ID" });

    const item = await Awareness.findById(id);
    if (!item) return res.status(404).json({ error: "Awareness not found" });

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET list of Awareness by topicId or date
export const getAwarenessList = async (req, res) => {
  try {
    const { topicId, date } = req.query;

    const filter = {};
    if (topicId) {
      if (!mongoose.Types.ObjectId.isValid(topicId))
        return res.status(400).json({ error: "Invalid topicId" });
      filter.topicId = topicId;
    }
    if (date) filter.date = date;

    const items = await Awareness.find(filter).sort({ date: -1 });
    if (!items.length)
      return res.status(404).json({ error: "No awareness items found" });

    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SEARCH Awareness by title
export const searchAwarenessByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title)
      return res.status(400).json({ error: "Title query is required" });

    const item = await Awareness.findOne({
      title: { $regex: title, $options: "i" },
    });
    if (!item)
      return res
        .status(404)
        .json({ error: "No awareness found with this title" });

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Awareness by ID
export const updateAwarenessById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid ID" });

    const updated = await Awareness.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Awareness not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Awareness by ID
export const deleteAwarenessById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid ID" });

    const deleted = await Awareness.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Awareness not found" });

    res.json({ message: "Awareness deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//here topic id can be refer to #tag and we will make a model for it and can add these awareness on the specific tags