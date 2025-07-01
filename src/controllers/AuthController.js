const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


class AuthController {
  async create(req, res) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(201).json({ message: "Tạo tài khoản thành công" });
    } catch (err) {
      console.error("Lỗi tạo tài khoản:", err.message);
      res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
    }
      
  }
  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "Tài khoản không tồn tại" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Mật khẩu không đúng" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json ({token})
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });

    }
  }

}

module.exports = new AuthController();
