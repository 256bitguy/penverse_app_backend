import mongoose from "mongoose";
 
const topicSchema = new mongoose.Schema({
     name:{
            type:String,
            required: true
        },
        ranking:{
            type: Number,
            required:true
        },
        chapter:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Chapter',
             index:true
        }
},{timestamps:true});

 

export const Topic = mongoose.model("Topic",topicSchema)