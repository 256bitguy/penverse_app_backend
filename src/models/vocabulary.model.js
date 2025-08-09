import mongoose from "mongoose";

const vocabularySchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
    },
     topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
        required: true,
         index:true
      },
    explanation: {
      type: String,
      required: true,
    },
    synonyms: [{
      type:String,
      required: true
    }],
     antonyms: [{
      type:String,
      required: true
    }],
    fillingBlanks:[
        {
            question:{
                type:String,
                required:true
            },
            word:{
                type:String,
                required:true
            }
        }
    ]
  },
  { timestamps: true }
);

export const Vocabulary = mongoose.model("Vocabulary", vocabularySchema);
