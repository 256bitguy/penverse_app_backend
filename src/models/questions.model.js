import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    ranking: {
      type: Number,
      required: true,
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
      index: true, // for filtering by topic
    },
    topicName: {
      type: String,
      required: false, // optional (can cache here for faster UI rendering)
      index: true,     // helpful if you want to search directly by topic name
    },
    statements: [
      {
        order: { type: String },
        statement: { type: String },
      },
    ],
    options: [
      {
        order: { type: String },
        statement: { type: String },
      },
    ],
    question: {
      type: String,
      required: true,
    },
    correctOption: {
      type: [Number], // supports multiple correct answers
    },
    answer: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["single", "multiple", "assertion-reason", "statement-based"],
      required: true,
    },
    imageUrl: {
      type: String,
      required: false, // optional
    },
    date: {
      type: Date,
      required: true,
      index: true, // index for faster queries by date
    },
  },
  { timestamps: true }
);

export const Question = mongoose.model("Question", questionSchema);
