const express = require("express");
const courseRouter = express.Router();
const CourseController = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");

courseRouter.post("/create", CourseController.create);
courseRouter.get("/user/:userId", CourseController.getCoursesByUser);
courseRouter.delete("/delete/:courseId", CourseController.deleteCourse);
module.exports = courseRouter;
