const User = require("../models/User");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const Answer = require("../models/Answer");
const Question = require("../models/Question");
const mongoose = require("mongoose");
class AnswerController {
  async addAnswer(req, res) {
    const { lessonId } = req.params;
    const { answerText } = req.body;
    console.log("Received answerText:", answerText);
    const questionsCount = answerText.length;
    try {
      const answer = new Answer({
        lessonId,
        answerText,
        questionsCount,
      });
      await answer.save();
      res.json({ message: "Tạo answer thành công", answer });
    } catch (err) {
      console.error(err);
    }
  }
  getAnswerCount = async (req, res) => {
    const { lessonId } = req.params;
    console.log(lessonId);
    try {
      const answer = await Answer.findOne({ lessonId: lessonId });
      const lesson = await Lesson.findOne({ _id: lessonId });
      if (lesson.type == "pdf") {
        res.json({ questionsCount: answer.questionsCount });
      }
      if (lesson.type == "multiple") {
        res.json({ questionsCount: lesson.questions.length });
      }
    } catch (err) {
      console.error(err);
    }
  };
  checkAnswer = async (req, res) => {
    const { lessonId } = req.params;
    const { userAnswers } = req.body;
    console.log("userAnswers", userAnswers);
    const maxScore = userAnswers.length;
    try {
      const lesson = await Lesson.findOne({ _id: lessonId });
      const answer = await Answer.findOne({ lessonId: lessonId });
      let failQuestions = [];
      // So sánh câu trả lời của người dùng với câu trả lời đúng
      if (lesson.type == "pdf") {
        let score = 0;
        const correctAnswers = answer.answerText;
        for (let i = 0; i < userAnswers.length; i++) {
          if (
            userAnswers[i] === correctAnswers[i] ||
            userAnswers[i].toUpperCase() === correctAnswers[i].toUpperCase()
          ) {
            score++;
          } else {
            failQuestions.push({
              questionIndex: i + 1,
              userAnswer: userAnswers[i],
              correctAnswer: correctAnswers[i],
            });
          }
        }
        const result = { score, maxScore, failQuestions };
        res.json(result);
      }
      if (lesson.type == "multiple") {
        let score = 0;
        let failQuestions = [];
        const questions = lesson.questions;
        const questionIds = questions.map(
          (question) => new mongoose.Types.ObjectId(question._id)
        );
        const correctAnswers = await Question.find(
          { _id: { $in: questionIds } },
          { _id: 1, correctAnswer: 1 }
        );
        console.log(correctAnswers);
        for (let i = 0; i < correctAnswers.length; i++) {
          console.log(
            correctAnswers[i].correctAnswer,
            "   ",
            userAnswers[i].answer
          );
          if (
            correctAnswers[i].correctAnswer == userAnswers[i].answer ||
            correctAnswers[i].correctAnswer.toUpperCase() ==
              userAnswers[i].answer
          ) {
            score++;
          } else {
            failQuestions.push({
              questionIndex: i + 1,
              userAnswer: userAnswers[i],
              correctAnswer: correctAnswers[i],
            });
          }
        }
        const result = { score, maxScore, failQuestions };
        console.log("result", result);
        res.json(result);
      }
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = new AnswerController();
