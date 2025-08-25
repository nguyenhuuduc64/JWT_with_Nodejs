const User = require("../models/User");
const Course = require("../models/Course");
class meController {
  getUserFollow = async (req, res) => {
    const courseId = req.params.courseId;
    try {
      const userFollow = await User.find({ followings: courseId });
      res.status(200).json(userFollow);
    } catch (err) {
      return res.status(500).json("Lỗi máy chủ: " + err.message);
    }
  };
}

module.exports = new meController();
