import mongoose from "mongoose";

const pointSchema = new mongoose.Schema({
  text: { type: String, default: "" },
  explanation: { type: String, default: "" },
  images: [{ type: String, default: "" }], // Array of images for this point
}, { _id: false });

const subtopicSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  images: [{ type: String, default: "" }], // Array of images for this subtopic
  points: [pointSchema]
}, { _id: false });

const topicSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  images: [{ type: String, default: "" }], // Array of images for this topic
  subtopics: [subtopicSchema]
}, { _id: false });

const noteSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true, index: true }, // Indexed topicId
  heading: { type: String, default: "" },
  images: [{ type: String, default: "" }], // Images for the note itself
  topics: [topicSchema]
}, { timestamps: true });

export default mongoose.model("Note", noteSchema);
