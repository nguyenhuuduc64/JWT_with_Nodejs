const express = require("express");
const questionRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const QuestionController = require("././../controllers/QuestionController");

questionRouter.post("/add/:courseId", QuestionController.bulkCreateQuestions);
questionRouter.get("/:courseId", QuestionController.addLesson);
module.exports = questionRouter;
