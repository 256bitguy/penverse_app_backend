import mongoose from "mongoose";

const idiomExampleSchema = new mongoose.Schema({
  sentence: { type: String, required: true },
  situation: { type: String, required: true },
  hindiSentence: { type: String, required: true },
}, { _id: false });

const idiomSchema = new mongoose.Schema(
  {
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
      index: true
    },
    idiom: { type: String, required: true },
    meaning: { type: String, required: true },
    imageUrl: { type: String },
    englishExplanation: { type: String, required: true },
    hindiExplanation: { type: String, required: true },
    examples: [idiomExampleSchema],
    createdAt: { type: Date, default: undefined },
    updatedAt: { type: Date, default: undefined },
  }
);

// 🔑 Indexes
idiomSchema.index({ idiom: 1 }, { unique: true }); // exact search
idiomSchema.index({ idiom: "text" });               // text/fuzzy search

// Pre-save hook for timestamps
idiomSchema.pre("save", function (next) {
  const now = new Date();
  if (!this.createdAt) this.createdAt = now;
  this.updatedAt = now;
  next();
});

export const Idiom = mongoose.model("Idiom", idiomSchema);
