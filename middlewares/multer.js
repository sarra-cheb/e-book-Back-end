const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Books')
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + extension)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedFileExtensions = ['.pdf']
  const extension = path.extname(file.originalname);
  if (allowedFileExtensions.includes(extension)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only ' + allowedFileExtensions + ' files are allowed.'));
  }
}
const uploadFile = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 52428800,
  },
});

module.exports = uploadFile