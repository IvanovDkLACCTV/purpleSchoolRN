const express = require("express")
const bodyParser = require("body-parser")
const cors = require("./middleware/corsMiddleware")
const logger = require("./middleware/logger")
const authRoutes = require("./routes/authRoutes")
const fileRoutes = require("./routes/fileRoutes")
const userRoutes = require("./routes/userRoutes")
const courseRoutes = require("./courses/courses")
const { ensureUploadsDir } = require("./middleware/uploadMiddleware")

const app = express()
const port = 3030

app.use(bodyParser.json())
app.use(cors)
app.use(logger)
app.use("/uploads", express.static("uploads"))

ensureUploadsDir() // Проверяем папку uploads

app.use("/api-v2/auth", authRoutes)
app.use("/api-v2/files", fileRoutes)
app.use("/api-v2/user", userRoutes)
app.use("/api-v2", courseRoutes)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
