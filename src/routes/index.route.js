const authRouter = require("./auth.route");
const courseRouter = require("./course.route");
const meRouter = require("./me.route");
const lessonRouter = require("./lesson.route");
function route(app) {
  app.use("/auth", authRouter);
  app.use("/course", courseRouter);
  app.use("/me", meRouter);
  app.use("/lesson", lessonRouter);
}

module.exports = route;
