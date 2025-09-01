import mongoose from "mongoose";

// Background Context
const backgroundContextPointSchema = new mongoose.Schema({
  title: { type: String, required: true },
  explanation: { type: String, required: true },
});

// Sub Topic
const subTopicSchema = new mongoose.Schema({
  titleStatement: { type: String, required: true },
  points: { type: String, required: true },
});

// Highlight Point
const highlightPointSchema = new mongoose.Schema({
  statement: { type: String, required: true },
  subStatements: { type: [String], default: [] },
});

// Key Highlight
const keyHighlightSchema = new mongoose.Schema({
  points: { type: [highlightPointSchema], default: [] },
});

// Conclusion Point
const conclusionPointSchema = new mongoose.Schema({
  title: { type: String, required: true },
  explanation: { type: String, required: true },
});

// Important Point
const importantPointSchema = new mongoose.Schema({
  title: { type: String, required: true },
  explanation: { type: String, required: true },
});

// Question
const questionSchema = new mongoose.Schema({
  statement: { type: String, required: true },
  options: { type: [String], default: [] },
  correctOption: { type: String, required: true },
});

// Main Banking Awareness Item
const  AwarenessItemSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: String, required: true, index: true }, // index added for faster queries
    type: {
      type: String,
      enum: ["banking", "upsc"], // restrict values
      required: true,
      index: true, // queries by type will also be faster
    },
    backgroundContextTitle: { type: String },
    backgroundContextPoints: { type: [backgroundContextPointSchema], default: [] },
    topicTitle: { type: String, required: true },
    subTopicTitles: { type: [subTopicSchema], default: [] },
    keyHighlightsOfTopic: { type: String },
    keyHighlightsTitle: { type: [keyHighlightSchema], default: [] },
    consequencesTitle: { type: String },
    subTopicConsequencesTitle: { type: [subTopicSchema], default: [] },
    conclusionPoints: { type: [conclusionPointSchema], default: [] },
    importantPoints: { type: [importantPointSchema], default: [] },
    questions: { type: [questionSchema], default: [] },
  },
  { timestamps: true }
);

// optional compound index (date + type) for very fast lookups
 AwarenessItemSchema.index({ date: 1, type: 1 });

export const  Awareness = mongoose.model(
  " Awareness",
   AwarenessItemSchema
);
