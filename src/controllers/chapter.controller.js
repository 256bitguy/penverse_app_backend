import mongoose from "mongoose";
import { Chapter } from "../models/chapter.models.js";
import { asynchandler } from "../utils/asynchandler.js";

// CREATE a new Chapter
export const publishAChapter = asynchandler(async (req, res) => {
  const { name, ranking, subject, image } = req.body;

  if (!name || !ranking || !subject) {
    return res.status(400).json({ error: "Name, Ranking, and Subject are required" });
  }

  const newChapter = await Chapter.create({ name, ranking, subject, image });
  res.status(201).json(newChapter);
});

// READ all Chapters by Subject
export const getAllChaptersBySubject = asynchandler(async (req, res) => {
  const { subjectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(subjectId)) {
    return res.status(400).json({ error: "Invalid Subject ID" });
  }

  const chapters = await Chapter.find({ subject: subjectId }).sort({ ranking: 1 });
  if (!chapters.length) return res.status(404).json({ error: "No chapters found" });

  res.json(chapters);
});

// READ single Chapter by ID
export const getChapterById = asynchandler(async (req, res) => {
  const { chapterId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(chapterId)) {
    return res.status(400).json({ error: "Invalid Chapter ID" });
  }

  const chapter = await Chapter.findById(chapterId);
  if (!chapter) return res.status(404).json({ error: "Chapter not found" });

  res.json(chapter);
});

// UPDATE Chapter by ID
export const updateChapterById = asynchandler(async (req, res) => {
  const { chapterId } = req.params;
  const { name, ranking, subject, image } = req.body;

  if (!mongoose.Types.ObjectId.isValid(chapterId)) {
    return res.status(400).json({ error: "Invalid Chapter ID" });
  }

  const updatedChapter = await Chapter.findByIdAndUpdate(
    chapterId,
    { name, ranking, subject, image, updatedAt: new Date() },
    { new: true }
  );

  if (!updatedChapter) return res.status(404).json({ error: "Chapter not found" });

  res.json(updatedChapter);
});

// DELETE Chapter by ID
export const deleteChapterById = asynchandler(async (req, res) => {
  const { chapterId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(chapterId)) {
    return res.status(400).json({ error: "Invalid Chapter ID" });
  }

  const deleted = await Chapter.findByIdAndDelete(chapterId);
  if (!deleted) return res.status(404).json({ error: "Chapter not found" });

  res.json({ message: "Chapter deleted successfully" });
});
