import mongoose from "mongoose";

const nestedPointSchema = new mongoose.Schema({
  label: { type: String, required: true }, // bold title
  explanation: { type: String, required: true },
  example: { type: String }, // optional
});

const subheadingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  points: [nestedPointSchema],
  example: { type: String }, // optional
  linkingNote: { type: String }, // optional
  personalQuery: { type: String }, // optional
  queryExplanation: { type: String }, // optional
});

const noteSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    subheadings: [subheadingSchema],
  },
  { timestamps: true }
);

export const Note = mongoose.model("Note", noteSchema);
