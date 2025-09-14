const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    note: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String, // URL ảnh trong Supabase
      required: true,
    },

    correctAnswer: {
      type: String,
      enum: ["a", "b", "c", "d"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Question || mongoose.model("Question", QuestionSchema);
