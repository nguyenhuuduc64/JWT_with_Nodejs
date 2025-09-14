const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  role: { type: String, enum: ["teacher", "student"], default: "student" },
  courseJoined: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Course", default: [] },
  ],

  followings: { type: String, default: "" },
  fullname: { type: String, required: false },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
