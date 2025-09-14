const Question = require("../models/Question");
const supabase = require("../../supabase");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const Lesson = require("../models/Lesson");
class QuestionController {
  bulkCreateQuestions = async (req, res) => {
    try {
      const { courseId, questions } = req.body;
      console.log("questions", questions);

      const savedQuestions = [];

      for (const question of questions) {
        const newQuestion = new Question({
          courseId,
          note: question.note,
          correctAnswer: question.answer,
          imageUrl: question.imageUrl,
        });

        const saved = await newQuestion.save();
        savedQuestions.push(saved);
      }

      return res.status(201).json({
        message: "Questions saved successfully",
        questions: savedQuestions,
      });
    } catch (err) {
      console.error("Error saving questions:", err);
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
  };

  async addLesson(req, res) {
    const { courseId } = req.params;
    console.log("courseId", courseId);
    const { n } = req.query;
    const numberOfQuestions = parseInt(n);
    console.log(numberOfQuestions);
    const questions = await Question.aggregate([
      { $match: { courseId: new mongoose.Types.ObjectId(courseId) } }, //parse về Object để match với model
      { $sample: { size: numberOfQuestions } }, //random ra số lượng number
      { $project: { correctAnswer: 0 } }, //loại bỏ trường corectAnswer
    ]);
    console.log("questions", questions);
    const newLesson = new Lesson({
      courseId,
      questions,
      type: "multiple",
    });
    await newLesson.save();

    res.json(newLesson);
  }
}

module.exports = new QuestionController();
