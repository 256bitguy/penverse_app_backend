import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  ranking: {
    type: Number,
    required: true
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
    index:true
  },
  statements: [
    {
      order: { type: String,  },
      statement: { type: String,  }
    }
  ],
  options: [
    {
      order: { type: String,  },
      statement: { type: String,  }
    }
  ],
  question: {
    type: String,
    required: true
  },
  correctOption: {
    type: [Number], // allow multiple correct options if needed
  },
  answer: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['single', 'multiple', 'assertion-reason', 'statement-based'],
    required: true
  }
});

export const Question= mongoose.model('Question', questionSchema);
