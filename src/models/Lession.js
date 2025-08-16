const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lessionSchema = new Schema({
  title: { type: String, required: true },
  courseId: { type: String, required: true },
});

module.exports =
  mongoose.models.Lession || mongoose.model("Lession", lessionSchema);
