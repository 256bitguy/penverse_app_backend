import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: [true, "Subject ID is required"],
      index: true, // Indexed for faster lookups
    },
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      unique: true, // Title must be unique
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

// Optional: Ensure a compound index if you want title uniqueness scoped by subject
bookSchema.index({ subjectId: 1, title: 1 }, { unique: true });

export default mongoose.model("Book", bookSchema);
