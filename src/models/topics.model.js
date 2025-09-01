import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ranking: {
        type: Number,
        required: true
    },
    chapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter',
        index: true
    },
    image: {
        type: String,  // Cloudinary URL
        required: false // optional
    }
}, { timestamps: true });

export const Topic = mongoose.model("Topic", topicSchema);
