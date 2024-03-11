const multer = require("multer");
const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  console.log("file is at upload func");
  if (!file.mimetype.startsWith('image')) {
    cb('Supports only image files', false)
  }
  cb(null, true)
}

exports.uploadImage = multer({ storage, fileFilter })