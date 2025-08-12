const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete = require("mongoose-delete");

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  grade: { type: Number },
  subject: { type: String },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  coverImage: { type: String, default: "" },
});

courseSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: "all",
});
module.exports =
  mongoose.models.Course || mongoose.model("Course", courseSchema);
