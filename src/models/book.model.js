import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: [true, "Subject ID is required"],
    },
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String, // store URL or local asset name
      default: "",
    },
    totalChapters: {
      type: Number,
      default: 0, // will be updated as chapters are added
    },
    author: {
      type: String,
      default: "Unknown",
    },
    publishedYear: {
      type: Number,
      default: new Date().getFullYear(),
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", bookSchema);
