const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lessionSchema = new Schema({
  title: { type: String, required: true },
  courseId: { type: String, required: true },
  fileUrl: { type: String },
  fileName: { type: String },
});

module.exports =
  mongoose.models.Lesson || mongoose.model("Lesson", lessionSchema);
