import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rank: {
      type: Number,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String, // Cloudinary URL
      required: false // optional
    },
  },
  { timestamps: true }
);

export const Subject = mongoose.model("Subject", subjectSchema);
