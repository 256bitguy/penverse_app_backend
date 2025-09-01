import mongoose from "mongoose";
const dailyEditorialSchema = new mongoose.Schema({
  date: { type: Date, required: true, index: true },
  list: [{ type: mongoose.Schema.Types.ObjectId, ref: "Editorial" }],
}, { timestamps: true });

export const DailyEditorial = mongoose.model("DailyEditorial", dailyEditorialSchema);
