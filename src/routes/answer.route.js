const express = require("express");
const answerRouter = express.Router();
const AuthController = require("../controllers/authController");
const AnswerController = require("../controllers/AnswerController");
// Đăng ký tài khoản

answerRouter.post("/create/:lessonId", AnswerController.addAnswer);
answerRouter.get("/count/:lessonId", AnswerController.getAnswerCount);
answerRouter.post("/check/:lessonId", AnswerController.checkAnswer);

module.exports = answerRouter;
