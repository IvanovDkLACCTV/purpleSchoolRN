const express = require("express")
const { uploadImage } = require("../controllers/fileController")
const router = express.Router()

router.post("/upload-image", uploadImage)

module.exports = router
