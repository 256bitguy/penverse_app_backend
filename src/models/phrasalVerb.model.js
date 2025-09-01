import mongoose from "mongoose";

// Example Schema (embedded, no _id for smaller size)
const phrasalVerbExampleSchema = new mongoose.Schema(
  {
    sentence: { type: String, required: true },
    situation: { type: String, required: true },
    hindiSentence: { type: String, required: true },
  },
  { _id: false }
);

// Main Schema
const phrasalVerbSchema = new mongoose.Schema(
  {
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
      index: true, // ✅ Faster lookups by topic
    },
    phrasalVerb: {
      type: String,
      required: true,
      index: true, // ✅ Exact match searches faster
    },
    meaning: { type: String, required: true },
    imageUrl: { type: String }, // ✅ optional by default
    englishExplanation: { type: String, required: true },
    hindiExplanation: { type: String, required: true },
    examples: { type: [phrasalVerbExampleSchema], default: [] },

    // ✅ Custom timestamps (overridable)
    createdAt: { type: Date, default: undefined },
    updatedAt: { type: Date, default: undefined },
  },
  {
    minimize: true, // remove empty objects
  }
);

// ✅ Pre-save hook for flexible timestamps
phrasalVerbSchema.pre("save", function (next) {
  const now = new Date();
  if (!this.createdAt) this.createdAt = now; // only set once
  this.updatedAt = now; // always update
  next();
});

// ✅ Compound Text Index for searching across multiple fields
phrasalVerbSchema.index({
  phrasalVerb: "text",
  meaning: "text",
  englishExplanation: "text",
  hindiExplanation: "text",
});

export const PhrasalVerb = mongoose.model(
  "PhrasalVerb",
  phrasalVerbSchema
);
