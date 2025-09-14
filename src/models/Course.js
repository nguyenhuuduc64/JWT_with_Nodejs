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
  deleted: { type: Boolean, default: false }, // Thêm dòng này
  deletedAt: { type: Date },
  userFollow: [{ type: mongoose.Schema.Types.ObjectId, ref: "", default: [] }],
});

courseSchema.plugin(mongoose_delete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: "all",
});
module.exports =
  mongoose.models.Course || mongoose.model("Course", courseSchema);
