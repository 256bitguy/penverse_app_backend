// models/Chapter.js
import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true,
      unique: true,    // Ensure global uniqueness
      trim: true,
      index: true      // Indexed for faster search
    },
    description: { type: String },
    bookId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Book", 
      required: true 
    },
  },
  { timestamps: true }
);

// Optional: Make chapter titles unique per book instead of globally
chapterSchema.index({ bookId: 1, title: 1 }, { unique: true });

export default mongoose.model("Chapter", chapterSchema);
