const User = require("../models/User");

class meController {
  getUserFollow = async (req, res) => {
    const courseId = req.params.courseId;
    console.log("Yêu cầu lấy người theo dõi khóa học:", courseId);
    try {
      const userFollow = await User.find({ followings: courseId });
      console.log("Danh sách người theo dõi:", userFollow);
      res.status(200).json(userFollow);
    } catch (err) {
      return res.status(500).json("Lỗi máy chủ: " + err.message);
    }
  };
}

module.exports = new meController();
