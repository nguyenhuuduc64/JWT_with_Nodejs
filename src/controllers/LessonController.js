const User = require("../models/User");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
class LessonController {
  async addLesson(req, res) {
    console.log("yeu cau them khoa hoc");
    console.log("Request body:", req.body); // Kiểm tra dữ liệu text
    console.log("Request file:", req.file); // <<< THÊM DÒNG NÀY để kiểm tra file

    try {
      const { title, fileUrl } = req.body;
      console.log("body request", req.body);
      const { courseId } = req.params;
      const file = req.file; // từ multer

      console.log("File object from Multer:", file); // <<< VÀ DÒNG NÀY

      if (file) {
        try {
          const fileName = `lessons/${Date.now()}-${file.originalname}`;

          // Kiểm tra xem file.buffer có tồn tại không, nếu không thì sử dụng fs
          let fileData = file.buffer;
          // Nếu dùng diskStorage, file sẽ nằm trong file.path
          // const fileData = fs.readFileSync(file.path); // Nhớ require('fs')

          // Upload file lên Supabase Storage
          const { data, error: uploadError } = await supabase.storage
            .from("documents")
            .upload(fileName, fileData, {
              // Dùng fileData thay vì file.buffer
              contentType: file.mimetype,
              upsert: true,
            });

          if (uploadError) {
            console.error("Lỗi upload Supabase:", uploadError);
            throw uploadError;
          }

          // Lấy public URL
          const { data: publicUrlData, error: urlError } = supabase.storage
            .from("documents")
            .getPublicUrl(fileName);

          if (urlError) {
            console.error("Lỗi lấy public URL:", urlError);
            throw urlError;
          }

          console.log("Upload thành công. URL:", fileUrl);
        } catch (err) {
          // Chỉ log lỗi và tiếp tục, không throw để lesson vẫn được tạo (nếu muốn)
          console.error("Lỗi trong quá trình xử lý file:", err.message);
          // Bạn có thể quyết định có nên throw lỗi không hay để fileUrl là null
          // throw err; // Nếu muốn dừng hoàn toàn
        }
      }

      // Lưu vào MongoDB
      const lesson = new Lesson({ title, courseId, fileUrl });
      await lesson.save();

      res.json({ message: "Tạo lesson thành công", lesson });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new LessonController();
