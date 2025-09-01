import mongoose from "mongoose";

const editorialOptionSchema = new mongoose.Schema({
  statement: {
    type: String,
    required: true,
  },
});

const editorialQuestionSchema = new mongoose.Schema({
  statement: {
    type: String,
    required: true,
  },
  options: {
    type: [editorialOptionSchema],
    default: [],
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

const editorialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    paragraph: {
      type: String,
      required: true,
    },
    image: {
      type: String,  
      required: false,
    },
    date: {
      type: Date,
      default: Date.now,  
    },
    questions: {
      type: [editorialQuestionSchema],
      default: [],
    },
  },
  { timestamps: true }      
);

export const Editorial = mongoose.model("Editorial", editorialSchema);
