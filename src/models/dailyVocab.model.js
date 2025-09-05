import mongoose from "mongoose";
const dailyVocabSchema = new mongoose.Schema({
  date: { type: Date, required: true, index: true },
  list: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vocabulary" }],
}, { timestamps: true });

export const DailyVocab = mongoose.model("DailyVocab", dailyVocabSchema);
