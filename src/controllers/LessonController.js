const User = require("../models/User");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const { deleteFile } = require("../services/storageService");
class LessonController {
  async addLesson(req, res) {
    try {
      const { title, fileUrl, fileName } = req.body;
      const { courseId } = req.params;
      const file = req.file;

      console.log("File object from Multer:", file); // <<< VÀ DÒNG NÀY

      if (file) {
        try {
          const fileName = `lessons/${Date.now()}-${file.originalname}`;

          let fileData = file.buffer;

          const { data, error: uploadError } = await supabase.storage
            .from("documents")
            .upload(fileName, fileData, {
              contentType: file.mimetype,
              upsert: true,
            });

          if (uploadError) {
            console.error("Lỗi upload Supabase:", uploadError);
            throw uploadError;
          }
          const { data: publicUrlData, error: urlError } = supabase.storage
            .from("documents")
            .getPublicUrl(fileName);

          if (urlError) {
            console.error("Lỗi lấy public URL:", urlError);
            throw urlError;
          }

          console.log("Upload thành công. URL:", fileUrl);
        } catch (err) {
          console.error("Lỗi trong quá trình xử lý file:", err.message);
        }
      }

      const lesson = new Lesson({
        title,
        courseId,
        fileUrl,
        fileName: `files/${fileName}`,
        type: "pdf",
      });
      await lesson.save();

      res.json({ message: "Tạo lesson thành công", lesson });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateLesson(req, res) {
    const courseIdObj = await Lesson.findById(req.params.id).select("courseId");
    const courseId = courseIdObj.courseId;
    const newLesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        courseId: courseId,
      },
      { new: true, runValidators: true }
    );
    res.json(newLesson);
  }

  async deleteLesson(req, res) {
    console.log("Đã vào hàm deleteLesson");
    const lessonId = req.params.id;
    const deleteLesson = await Lesson.findById(lessonId);
    await deleteFile("documents", deleteLesson.fileName);
    await Lesson.findByIdAndDelete(lessonId);
    res.json({ message: "Xóa lesson thành công" });
  }
}

module.exports = new LessonController();
