const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  lessonId: { type: String, required: true },
  answerText: { type: Array, required: true },
  questionsCount: { type: Number, required: true },
});

module.exports =
  mongoose.models.Answer || mongoose.model("Answer", answerSchema);
