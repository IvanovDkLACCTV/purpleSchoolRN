const multer = require("multer")
const path = require("path")
const fs = require("fs")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage })

const ensureUploadsDir = () => {
  if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads")
  }
}

module.exports = { upload, ensureUploadsDir }
