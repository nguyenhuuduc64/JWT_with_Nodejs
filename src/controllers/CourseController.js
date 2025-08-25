const Course = require("../models/Course");
const mongoose = require("mongoose");
const Lession = require("../models/Lesson");

class CourseController {
  async getCourse(req, res) {
    try {
      const { courseId } = req.params;

      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({ message: "Không tìm thấy khóa học" });
      }

      res.json(course);
    } catch (err) {
      console.error("Lỗi lấy khóa học:", err.message);
      res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
    }
  }

  async create(req, res) {
    try {
      const newCourse = new Course({
        title: req.body.title,
        description: req.body.description || "",
        grade: req.body.grade || 0, // Mặc định là 0 nếu không có grade
        subject: req.body.subject || "",
        teacherId: req.body.teacherId, // ID của người dạy
        coverImage:
          req.body.coverImage ||
          "https://tutorhelpme.co.uk/wp-content/uploads/2024/08/What-is-function-in-maths.jpg", // Mặc định là chuỗi rỗng
      });
      await newCourse.save();
      res.status(201).json({ message: "tao khoa hoc thanh cong" });
    } catch (err) {
      console.error("Lỗi tạo khoa hoc", err.message);
      res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
    }
  }
  async getCoursesByUser(req, res) {
    const { userId } = req.params;
    try {
      const courses = await Course.find({ teacherId: userId });
      res.json(courses);
    } catch (err) {
      console.error("Lỗi lấy khóa học:", err.message);
      res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
    }
  }

  async deleteCourse(req, res) {
    const { courseId } = req.params;
    try {
      // Xoá mềm và lấy kết quả
      const deletedCourse = await Course.delete({ _id: courseId });

      if (!deletedCourse) {
        return res.status(404).json({ message: "Không tìm thấy khóa học" });
      }

      res.json({
        message: "Xóa khóa học thành công",
        course: deletedCourse,
      });
    } catch (err) {
      console.error("Lỗi xóa khóa học:", err.message);
      res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
    }
  }

  updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const updateData = req.body;

    try {
      const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        updateData
      );
    } catch (err) {
      console.error("Lỗi cập nhật khóa học:", err.message);
      return res
        .status(500)
        .json({ message: "Lỗi máy chủ", error: err.message });
    }
  };

  async getAllLessions(req, res) {
    try {
      const { courseId } = req.params;
      const lessons = await Lession.find({ courseId: courseId });
      res.status(200).json(lessons);
    } catch (error) {
      console.error("Lỗi lấy bài học:", error.message);
      return res
        .status(500)
        .json({ message: "Lỗi máy chủ", error: error.message });
    }
  }
}

module.exports = new CourseController();
