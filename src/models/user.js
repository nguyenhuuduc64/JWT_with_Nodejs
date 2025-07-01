const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// ✅ Kiểm tra nếu model đã tồn tại thì dùng lại, không định nghĩa lại
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
