const express = require("express");
const courseRouter = express.Router();
const CourseController = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");

courseRouter.post("/create", CourseController.create);
courseRouter.get(
  "/user/:userId",
  authMiddleware,
  CourseController.getCoursesByUser
);
courseRouter.delete("/delete/:courseId", CourseController.deleteCourse);
courseRouter.put("/update/:courseId", CourseController.updateCourse);
courseRouter.get("/:courseId/lessons", CourseController.getAllLessions);
courseRouter.post("/:courseId", CourseController.addLession);
module.exports = courseRouter;
