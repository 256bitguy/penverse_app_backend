import mongoose from "mongoose";
const dailyIdiomSchema = new mongoose.Schema({
  date: { type: Date, required: true, index: true },
  list: [{ type: mongoose.Schema.Types.ObjectId, ref: "Idiom" }],
}, { timestamps: true });

export const DailyIdiom = mongoose.model("DailyIdiom", dailyIdiomSchema);
