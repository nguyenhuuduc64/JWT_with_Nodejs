const supabase = require("../../supabase.js");
/*ham xoa file trong supabase */
async function deleteFile(bucketName, filePath) {
  console.log("Xóa file trong Supabase:", filePath);
  const { error } = await supabase.storage.from(bucketName).remove([filePath]); // filePath = "folder/myfile.pdf"

  if (error) {
    console.error("Lỗi khi xóa file:", error.message);
    return { success: false, error: error.message };
  }

  console.log("Đã xóa file:", filePath);
  return { success: true };
}

module.exports = { deleteFile };
