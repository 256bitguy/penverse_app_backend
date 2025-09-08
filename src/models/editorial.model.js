import mongoose from "mongoose";

// Option Schema
const editorialOptionSchema = new mongoose.Schema({
  statement: { type: String, required: true },
}, { _id: false });

// Question Schema
const editorialQuestionSchema = new mongoose.Schema({
  statement: { type: String, required: true },
  options: { type: [editorialOptionSchema], default: [] },
  correctAnswer: { type: String, required: true },
}, { _id: false });

// Main Editorial Item Schema
const editorialItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  paragraph: { type: [String], required: true }, // <-- array of paragraphs
  questions: { type: [editorialQuestionSchema], default: [] },
  date: { type: Date, required: true, index: true }, // for daily selection
}, { timestamps: true });

// Optional compound index for faster date + title lookups
editorialItemSchema.index({ date: 1, title: 1 });

export const Editorial = mongoose.model("Editorial", editorialItemSchema);
