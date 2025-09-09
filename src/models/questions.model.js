import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    ranking: {
      type: Number,
      required: true,
    },

    // Topic mapping
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: false,
      index: true,
    },
    topicName: { type: String, index: true },
    tags: [{ type: String, index: true }],

    // Core Question Structure
    instructions: { type: String }, // optional pre-question instructions
    questionText: { type: String }, // main question body
    images: [{ type: String }], // array of image URLs (optional)

    statements: [
      {
        order: { type: Number },
        text: { type: String },
      },
    ],

    options: [
      {
        order: { type: Number },
        text: { type: String },
        imageUrl: { type: String },
      },
    ],

    // Answers
    singleCorrectIndex: { type: Number }, // if single correct
    multipleCorrectIndexes: [{ type: Number }], // if multiple correct

    // Solutions
    solutionText: { type: String },
    solutionImage: { type: String },

    // Metadata
    type: {
      type: String,
      enum: [
        "single", 
        "multiple", 
        "assertion-reason", 
        "statement-based",
        "chronology", 
        "matching", 
        "true-false", 
        "fill-blank", 
        "descriptive"
      ],
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
    meta: {
      marks: { type: Number, default: 1 },
      negativeMarks: { type: Number, default: 0 },
      source: { type: String },
      year: { type: Number },
    },

    // Variants
    variant: {
      assertionReason: {
        assertion: { type: String },
        reason: { type: String },
        correctOption: { type: String }, // A/B/C/D style
      },
      chronology: {
        items: [
          {
            event: { type: String },
            year: { type: Number },
          },
        ],
        correctOrder: [{ type: Number }], // array of indexes
      },
      trueFalse: {
        statement: { type: String },
        answer: { type: Boolean },
      },
    },

    // System info
    date: { type: Date, default: Date.now, },
  },
  { timestamps: true }
);

export const Question = mongoose.model("Question", questionSchema);
