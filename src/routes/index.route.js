const authRouter = require("./auth.route");
const courseRouter = require("./course.route");
function route(app) {
  app.use("/auth", authRouter);
  app.use("/course", courseRouter);
}

module.exports = route;
