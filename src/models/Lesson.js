const mongoose = require("mongoose");
const Question = require("./Question");
const Schema = mongoose.Schema;

const lessionSchema = new Schema({
  title: { type: String, required: false },
  courseId: { type: String, required: true },
  fileUrl: { type: String },
  fileName: { type: String },
  questions: [{ note: String, imageUrl: String }],
  type: { type: String },
});

module.exports =
  mongoose.models.Lesson || mongoose.model("Lesson", lessionSchema);
