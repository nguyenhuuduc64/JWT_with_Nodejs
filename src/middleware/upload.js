const multer = require("multer");

// lưu file trong RAM thay vì ổ đĩa
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;
