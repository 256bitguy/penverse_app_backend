import mongoose, {isValidObjectId} from "mongoose"
import {Topic} from "../models/topics.model.js"
 
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asynchandler} from "../utils/asynchandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllTopics = asynchandler(async (req, res) => {
    const chapterId = req.params.chapterId
    try {
        const allTopics =await  Topic.find({chapter : chapterId})
        res.status(201).json({allTopics})
    } catch (error) {
        res.status(400).json({error : "No Topic Found"})        
    }
})
const publishATopic = asynchandler(async (req, res) => {
  const { name, ranking, chapter } = req.body;

  if (!name || !ranking || !chapter) {
    return res.status(400).json({ error: "Name, Ranking, and chapter are required" });
  }

  try {
    const topic = await Topic.create({ name, ranking, chapter });
    res.status(201).json({ topic });
  } catch (error) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
});

// const getTopicById = asynchandler(async (req, res) => {
//     const { TopicId } = req.params
     
// })

// const updateTopic = asynchandler(async (req, res) => {
//     const { TopicId } = req.params
    

// })

// const deleteTopic = asynchandler(async (req, res) => {
//     const { TopicId } = req.params
    
// })

// const togglePublishStatus = asynchandler(async (req, res) => {
//     const { TopicId } = req.params
// })

export {
    getAllTopics,
    publishATopic,
    // getTopicById,
    // updateTopic,
    // deleteTopic,
    // togglePublishStatus
}
