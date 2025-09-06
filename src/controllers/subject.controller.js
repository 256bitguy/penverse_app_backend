import Subject from "../models/subject.model.js";

/**
 * @desc    Create a new Subject
 * @route   POST /api/subjects
 */
export const createSubject = async (req, res) => {
  try {
    const { name, description, iconType, iconValue } = req.body;

    // Check if subject with same name already exists
    const existing = await Subject.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ message: "Subject already exists" });
    }

    const subject = new Subject({
      name,
      description,
      iconType,
      iconValue,
    });

    await subject.save();

    res.status(201).json({ message: "Subject created successfully", subject });
  } catch (error) {
    console.error("❌ Create Subject Error:", error);
    res.status(500).json({ message: "Failed to create subject", error });
  }
};

/**
 * @desc    Get all Subjects
 * @route   GET /api/subjects
 */
export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 });
    res.status(200).json(subjects);
  } catch (error) {
    console.error("❌ Get All Subjects Error:", error);
    res.status(500).json({ message: "Failed to fetch subjects", error });
  }
};

/**
 * @desc    Get single Subject by ID
 * @route   GET /api/subjects/:id
 */
export const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json(subject);
  } catch (error) {
    console.error("❌ Get Subject By ID Error:", error);
    res.status(500).json({ message: "Failed to fetch subject", error });
  }
};

/**
 * @desc    Update Subject
 * @route   PUT /api/subjects/:id
 */
export const updateSubject = async (req, res) => {
  try {
    const { name, description, iconType, iconValue } = req.body;

    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    subject.name = name || subject.name;
    subject.description = description || subject.description;
    subject.iconType = iconType || subject.iconType;
    subject.iconValue = iconValue || subject.iconValue;

    await subject.save();

    res.status(200).json({ message: "Subject updated successfully", subject });
  } catch (error) {
    console.error("❌ Update Subject Error:", error);
    res.status(500).json({ message: "Failed to update subject", error });
  }
};

/**
 * @desc    Delete Subject
 * @route   DELETE /api/subjects/:id
 */
export const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    await subject.deleteOne();

    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    console.error("❌ Delete Subject Error:", error);
    res.status(500).json({ message: "Failed to delete subject", error });
  }
};
