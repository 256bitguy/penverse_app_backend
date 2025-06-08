import {asynchandler} from "../utils/asynchandler.js"
import { Question } from "../models/questions.model.js";

// GET /questions — list with pagination, filter, sort
const getAllQuestions = asynchandler(async (req, res) => {
  const { topicId } = req.params;

  if (!topicId) {
    return res.status(400).json({ message: "topicId is required in params" });
  }

  const questions = await Question.find({ topicId });

  res.status(200).json({
    questions,
  });
});


// POST /questions — create new question
const publishAQuestion = asynchandler(async (req, res) => {
  const {
    ranking,
    topicId,
    question,
    correctOption,
    answer,
    statements,
    options,
    type
  } = req.body;

  const requiredFields = ['ranking', 'topicId', 'question', 'correctOption', 'answer', 'statements', 'options', 'type'];
  const missingFields = requiredFields.filter(field => req.body[field] === undefined || req.body[field] === null || req.body[field] === '');

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(', ')}`
    });
  }

  const newQuestion = await Question.create({
    ranking,
    topicId,
    question,
    correctOption,
    answer,
    statements,
    options,
    type
  });

  res.status(201).json(newQuestion);
});


// GET /questions/:questionId — get question by ID
const getQuestionById = asynchandler(async (req, res) => {
  const { questionId } = req.params;

  const question = await Question.findById(questionId);
  if (!question) {
    return res.status(404).json({ message: 'Question not found' });
  }

  res.status(200).json(question);
});

// PUT /questions/:questionId — update question
const updateQuestion = asynchandler(async (req, res) => {
  const { questionId } = req.params;

  const updated = await Question.findByIdAndUpdate(questionId, req.body, {
    new: true,
    runValidators: true
  });

  if (!updated) {
    return res.status(404).json({ message: 'Question not found or update failed' });
  }

  res.status(200).json(updated);
});

// DELETE /questions/:questionId — delete question
const deleteQuestion = asynchandler(async (req, res) => {
  const { questionId } = req.params;

  const deleted = await Question.findByIdAndDelete(questionId);
  if (!deleted) {
    return res.status(404).json({ message: 'Question not found or delete failed' });
  }

  res.status(200).json({ message: 'Question deleted successfully' });
});

export {
  getAllQuestions,
  publishAQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion
};
