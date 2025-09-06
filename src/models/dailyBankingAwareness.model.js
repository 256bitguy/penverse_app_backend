import mongoose from "mongoose";

const DailyBankingAwarenessSchema = new mongoose.Schema({
  date: { type: Date, required: true, index: true },
  list: [{ type: mongoose.Schema.Types.ObjectId, ref: "BankingAwareness" }],
}, { timestamps: true });

export const DailyBankingAwareness = mongoose.model("DailyBankingAwareness", DailyBankingAwarenessSchema);