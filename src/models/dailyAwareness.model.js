import mongoose from "mongoose";

const dailyAwarenessSchema = new mongoose.Schema({
  date: { type: Date, required: true, index: true },
  list: [{ type: mongoose.Schema.Types.ObjectId, ref: "Awareness" }],
}, { timestamps: true });

export const DailyAwareness = mongoose.model("DailyAwareness", dailyAwarenessSchema);