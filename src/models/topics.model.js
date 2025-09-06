// models/Topic.js
import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true,
      unique: true, // Ensures topic titles are unique
      trim: true
    },
    chapterId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Chapter", 
      required: true, 
      index: true // Indexed for performance
    },
  },
  { timestamps: true }
);

// Optional: To make title unique **within a chapter** instead of globally
// topicSchema.index({ chapterId: 1, title: 1 }, { unique: true });

export default mongoose.model("Topic", topicSchema);
