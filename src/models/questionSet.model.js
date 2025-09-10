import mongoose from "mongoose";

// Option schema
const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
}, { _id: false });

// Objective Question schema
const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  imageUrl: { type: String }, // optional
  options: { 
    type: [optionSchema], 
    validate: [arrayLimit, '{PATH} must have exactly 4 options'],
    required: true
  },
  correctAnswer: { 
    type: String, 
    required: true,
    validate: {
      validator: function(value) {
        // ensure correctAnswer is one of the options
        return this.options.some(opt => opt.text === value);
      },
      message: props => `${props.value} is not a valid answer. Must match one of the options.`
    }
  }
}, { _id: true }); // Each question has its own _id

function arrayLimit(val) {
  return val.length === 4;
}

// Parent schema to hold multiple questions
const questionSetSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
    index: true
  },
  title: { type: String, required: true },
  description: { type: String },
  questions: { type: [questionSchema], default: [] } // Array of questions
}, { timestamps: true });

// Ensure index is created (optional, since `index: true` already does this)
questionSetSchema.index({ topicId: 1 });

export default mongoose.model("QuestionSet", questionSetSchema);
