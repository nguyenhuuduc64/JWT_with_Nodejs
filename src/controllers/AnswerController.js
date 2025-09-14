const User = require("../models/User");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const Answer = require("../models/Answer");
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
        console.log("Answer found:", answer.questionsCount);
        res.json({ questionsCount: answer.questionsCount });
      }
    } catch (err) {
      console.error(err);
    }
  };
  checkAnswer = async (req, res) => {
    const { lessonId } = req.params;
    const { userAnswers } = req.body;
    let score = 0;
    const maxScore = userAnswers.length;
    try {
      const answer = await Answer.findOne({ lessonId: lessonId });
      const correctAnswers = answer.answerText;
      let failQuestions = [];
      // So sánh câu trả lời của người dùng với câu trả lời đúng
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
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = new AnswerController();
