const User = require("../models/User");
const Course = require("../models/Course");
const JoinRequest = require("../models/JoinRequest");
const { request } = require("express");
class meController {
  getUserFollow = async (req, res) => {
    const courseId = req.params.courseId;
    try {
      const course = await Course.findById(courseId);
      const user = await User.find({ _id: { $in: course.userFollow } });
      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json("Lỗi máy chủ: " + err.message);
    }
  };
  // create a join request
  followCourse = async (req, res) => {
    const userId = req.user.userId;
    const { courseId } = req.params;

    try {
      const exiting = await JoinRequest.findOne({
        student: userId,
        course: courseId,
      });
      if (exiting) {
        return res.status(400).json("Bạn đã gửi yêu cầu tham gia khóa học này");
      }

      const joinRequest = new JoinRequest({
        student: userId,
        course: courseId,
      });
      await joinRequest.save();
    } catch (error) {
      console.error("Error in followCourse:", error);
    }
    /**
     * try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { courseJoined: courseId } },
        { new: true }
      );
      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json("Lỗi máy chủ: " + err.message);
    }
     */
  };

  getCoursesJoined = async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    console.log("user", user);
    const courses = await Course.find({ userFollow: { $in: [userId] } });
    console.log(courses);
    res.json(courses);
  };

  async handleJoinCourse(req, res) {
    try {
      const { requestId } = req.body;

      const joinRequest = await JoinRequest.findByIdAndUpdate(
        requestId,
        { status: "approved" },
        { new: true }
      );

      if (!joinRequest) {
        return res.status(404).json({ message: "Join request not found" });
      }

      await Course.findByIdAndUpdate(
        joinRequest.course,
        { $addToSet: { userFollow: joinRequest.student } },
        { new: true }
      );

      return res.status(200).json({ message: "Join request approved" });
    } catch (err) {
      return res.status(500).json({ message: "Server error: " + err.message });
    }
  }
}

module.exports = new meController();
