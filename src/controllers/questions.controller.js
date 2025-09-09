// controllers/questionController.js
import { Question } from "../models/questions.model.js";

// ========================
// CREATE a new question
// ========================
export const createQuestion = async (req, res) => {
  try {
    const questionData = req.body;

    const question = new Question(questionData);
    await question.save();

    res.status(201).json({
      success: true,
      data: question,
      message: "Question created successfully",
    });
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ========================
// GET all questions
// ========================
export const getQuestions = async (req, res) => {
  try {
    const { topicid } = req.params;
    

    if (!topicid) {
      return res.status(400).json({
        success: false,
        error: "topicId is required",
      });
    }

    // Fetch all questions for the topicId and populate topic details
    const questions = await Question.find({ topicId: topicid })
      .populate("topicId")  // brings topic info
      .sort({ ranking: 1 });

  

    res.json({ success: true, data: questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};


// ========================
// GET a single question by ID
// ========================
export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    res.json({ success: true, data: question });
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ========================
// UPDATE a question
// ========================
export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const question = await Question.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    res.json({ success: true, data: question, message: "Question updated successfully" });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ========================
// DELETE a question
// ========================
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findByIdAndDelete(id);
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    res.json({ success: true, message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
