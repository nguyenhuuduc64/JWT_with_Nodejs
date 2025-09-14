const authRouter = require("./auth.route");
const courseRouter = require("./course.route");
const meRouter = require("./me.route");
const lessonRouter = require("./lesson.route");
const answerRouter = require("./answer.route");
const questionRouter = require("./question.route");
function route(app) {
  app.use("/auth", authRouter);
  app.use("/course", courseRouter);
  app.use("/me", meRouter);
  app.use("/lesson", lessonRouter);
  app.use("/answer", answerRouter);
  app.use("/question", questionRouter);
}

module.exports = route;
