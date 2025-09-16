const Course = require("../models/Course");
const JoinRequest = require("../models/JoinRequest");

class JoinRequestController {
  async getJoinRequests(req, res) {
    const teacherId = req.user.userId;
    const course = await Course.findOne({ teacherId });
    const response = await JoinRequest.find({ status: "pending" })
      .populate("student")
      .populate("course");
    res.status(200).json(response);
  }
}

module.exports = new JoinRequestController();
