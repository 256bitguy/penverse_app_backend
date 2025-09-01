import mongoose from "mongoose";
const dailyPhraseSchema = new mongoose.Schema({
  date: { type: Date, required: true, index: true },
  list: [{ type: mongoose.Schema.Types.ObjectId, ref: "Phrase" }],
}, { timestamps: true });

export const DailyPhrase = mongoose.model("DailyPhrase", dailyPhraseSchema);
