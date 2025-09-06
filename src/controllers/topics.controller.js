 
import Topic from "../models/topics.model.js";

 

// Create a new topic ensuring unique title
export const createTopic = async (req, res) => {
  try {
    const { title, chapterId } = req.body;

    if (!title || !chapterId) {
      return res.status(400).json({ message: "Title and Chapter ID are required" });
    }

    // Check if a topic with the same title already exists
    const existingTopic = await Topic.findOne({ title: title.trim() });
    if (existingTopic) {
      return res.status(400).json({ message: "A topic with this title already exists" });
    }

    const topic = new Topic({ title: title.trim(), chapterId });
    await topic.save();

    res.status(201).json({
      message: "Topic created successfully",
      topic,
    });
  } catch (error) {
    console.error("❌ Create Topic Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Get all topics
// controllers/topicController.js

// Get all topics for a specific chapter
export const getTopics = async (req, res) => {
  try {
    const { chapterId } = req.params; // Get chapterId from URL params

    if (!chapterId) {
      return res.status(400).json({ message: "Chapter ID is required" });
    }

    const topics = await Topic.find({ chapterId }).populate("chapterId", "title");

    if (!topics.length) {
      return res.status(404).json({ message: "No topics found for this chapter" });
    }

    res.status(200).json({data : topics});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a single topic by ID
export const getTopicById = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await Topic.findById(id).populate("chapterId", "title");

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all topics for a specific chapter
export const getTopicsByChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const topics = await Topic.find({ chapterId }).sort({ createdAt: -1 });

    if (!topics.length) {
      return res.status(404).json({ message: "No topics found for this chapter" });
    }

    res.status(200).json({data : topics});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a topic
export const updateTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const topic = await Topic.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.status(200).json({ message: "Topic updated successfully", topic });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a topic
export const deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;

    const topic = await Topic.findByIdAndDelete(id);

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.status(200).json({ message: "Topic deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
