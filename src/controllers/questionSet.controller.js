import QuestionSet from "../models/questionSet.model.js";

// Create a new Question Set
export const createQuestionSet = async (req, res) => {
  try {
    const { topicId, title, description, questions } = req.body;

    const newSet = new QuestionSet({
      topicId,
      title,
      description,
      questions,
    });

    const savedSet = await newSet.save();
    res.status(201).json(savedSet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Question Sets
export const getAllQuestionSets = async (req, res) => {
  try {
    const sets = await QuestionSet.find().populate("topicId", "name"); // optionally populate topic name
    res.status(200).json({ data: sets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 

// Get a single Question Set by ID (clean object response)
export const getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await QuestionSet.findById(quizId)
      .populate("topicId", "name"); // optional populate

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // 🔹 Format response to match frontend QuizModel
    const formattedQuiz = {
      _id: quiz._id,
      topicId: quiz.topicId?._id || quiz.topicId, // handle populated or plain ObjectId
      title: quiz.title,
      description: quiz.description || "",
      questions: quiz.questions.map((q) => ({
        _id: q._id,
        questionText: q.questionText,
        imageUrl: q.imageUrl || null,
        options: q.options.map((opt) => ({
          text: opt.text,
        })),
        correctAnswer: q.correctAnswer,
      })),
    };

    res.status(200).json({data : formattedQuiz});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Question Sets by topicId
export const getQuestionSetsByTopic = async (req, res) => {
  try {
    const sets = await QuestionSet.find({ topicId: req.params.topicId }).select(
      "_id title"
    ); // return only _id and title

    // Map into clean objects
    const result = sets.map((set) => ({
      id: set._id,
      title: set.title,
    }));

    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Question Set
export const updateQuestionSet = async (req, res) => {
  try {
    const updatedSet = await QuestionSet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSet)
      return res.status(404).json({ message: "Question set not found" });
    res.status(200).json(updatedSet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Question Set
export const deleteQuestionSet = async (req, res) => {
  try {
    const deletedSet = await QuestionSet.findByIdAndDelete(req.params.id);
    if (!deletedSet)
      return res.status(404).json({ message: "Question set not found" });
    res.status(200).json({ message: "Question set deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
