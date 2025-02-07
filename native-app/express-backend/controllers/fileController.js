const { upload } = require("../middleware/uploadMiddleware")
const { loadUsers, saveUsers } = require("../models/userModel")

exports.uploadImage = [
  upload.single("files"),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded." })

      const { userId } = req.body
      if (!userId)
        return res.status(400).json({ error: "User ID is required." })

      const users = await loadUsers()
      const user = users.find((u) => u.id === parseInt(userId, 10))
      if (!user) return res.status(404).json({ error: "User not found." })

      user.photo = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`
      await saveUsers(users)

      return res.json({
        message: "Image uploaded successfully.",
        photo: user.photo,
      })
    } catch (error) {
      console.error("Error uploading image:", error)
      return res
        .status(500)
        .json({ error: "An error occurred while uploading the image." })
    }
  },
]
