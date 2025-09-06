// models/Subject.js
import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Ensures subject names are unique
    },
    description: {
      type: String,
      default: "",
    },
    iconType: {
      type: String,
      enum: ["local", "remote"], // local = asset, remote = URL
      required: true,
      default: "local",
    },
    iconValue: {
      type: String,
      required: true, // either local icon key or remote URL
    },
    totalBooks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Subject", subjectSchema);
