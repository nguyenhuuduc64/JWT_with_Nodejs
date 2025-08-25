const express = require("express");
const lessonRouter = express.Router();
const LessonController = require("../controllers/LessonController");
const upload = require("../middleware/upload");
lessonRouter.post(
  "/:courseId",
  upload.single("file"), // nhận 1 file field "file"
  LessonController.addLesson
);
lessonRouter.put("/:id", LessonController.updateLesson);
lessonRouter.delete("/:id", LessonController.deleteLesson);
module.exports = lessonRouter;
