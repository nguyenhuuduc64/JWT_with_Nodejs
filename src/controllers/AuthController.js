const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "1080788604306-0hieg9rt038dscm1m3ig4fmcbels91em.apps.googleusercontent.com"
);

class AuthController {
  async create(req, res) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role || "student", // Mặc định là student nếu không có role
        fullname: req.body.fullname || "", // Mặc định là chuỗi rỗng
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
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }

  async googleLogin(req, res) {
    try {
      const { token } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience:
          "1080788604306-0hieg9rt038dscm1m3ig4fmcbels91em.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      const { email, name } = payload;

      let user = await User.findOne({ email });

      if (!user) {
        user = new User({
          username: name,
          email,
          password: "", // Vì dùng Google nên không cần password
          role: "student", // Mặc định là student
          fullname: name, // Lấy tên từ Google
        });
        await user.save();
      }

      const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token: jwtToken, user });
    } catch (err) {
      console.error("Lỗi xác thực Google:", err.message);
      console.error(err); // full stack trace
      res
        .status(401)
        .json({ message: "Xác thực Google thất bại", error: err.message });
    }
  }

  async getCurrentUser(req, res) {
    try {
      const user = await User.findById(req.user.userId).select("-password");
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }
      res.json(user);
    } catch (err) {
      console.error("Lỗi lấy thông tin người dùng:", err.message);
      res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
    }
  }
}

module.exports = new AuthController();
