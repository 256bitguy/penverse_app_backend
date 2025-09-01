import mongoose from "mongoose";

// Synonym / Antonym Schema
const synonymAntonymSchema = new mongoose.Schema(
  {
    word: { type: String, required: true },
    meaning: { type: String, required: true },
    englishExplanation: { type: String, required: true },
    hindiExplanation: { type: String, required: true },
  },
  { _id: false }
);

// Main Vocabulary Schema
const vocabularySchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
      index: true, // ✅ fast exact match search
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
      index: true, // ✅ faster filtering by topic
    },
    imageUrl: { type: String }, // optional
    partOfSpeech: { type: String }, // optional
    englishExplanation: { type: String, required: true },
    hindiExplanation: { type: String, required: true },

    synonyms: { type: [synonymAntonymSchema], default: [] },
    antonyms: { type: [synonymAntonymSchema], default: [] },

    // ✅ Flexible timestamps
    createdAt: { type: Date, default: undefined },
    updatedAt: { type: Date, default: undefined },
  },
  { minimize: true }
);

// ✅ Pre-save hook for custom timestamps
vocabularySchema.pre("save", function (next) {
  const now = new Date();
  if (!this.createdAt) this.createdAt = now;
  this.updatedAt = now;
  next();
});

// ✅ Compound Text Index for optimized full-text search
vocabularySchema.index({
  word: "text",
  "synonyms.word": "text",
  "antonyms.word": "text",
});

export const Vocabulary = mongoose.model("Vocabulary", vocabularySchema);
