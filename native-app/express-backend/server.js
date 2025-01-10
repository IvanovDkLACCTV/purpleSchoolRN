const express = require("express")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const { findUserByEmail, verifyPassword } = require("./users")
const cors = require("cors")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const app = express()
const port = 3030
const secretKey = "a-very-secret-key-123456"

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/") // Specify the folder to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage })

app.use(bodyParser.json())

// Configure CORS
const allowedOrigins = [
  "http://localhost:3030",
  "http://192.168.1.143:3030", // Android, Web local
  "http://192.168.1.143:3000", // Web React dev server
]

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without origin (like Postman)
      if (!origin) return callback(null, true)

      if (allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
)

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`, req.headers)
  next()
})

// Serve static files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Log all incoming requests (debugging purpose)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`)
  next()
})

// Image upload endpoint
app.post(
  "/api-v2/files/upload-image",
  upload.single("files"),
  async (req, res) => {
    console.log("Body:", req.body) // Логируем тело запроса
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." })
      }

      const { userId } = req.body // Получаем ID пользователя из тела запроса
      if (!userId) {
        return res.status(400).json({ error: "User ID is required." })
      }

      const filePath = `/uploads/${req.file.filename}`

      // Обновляем путь в профиле пользователя
      const users = await loadUsers()
      const user = users.find((u) => u.id === userId)
      if (!user) {
        return res.status(404).json({ error: "User not found." })
      }

      user.photo = `${req.protocol}://${req.get("host")}${filePath}` // Обновляем путь к фото
      await saveUsers(users) // Сохраняем обновления в users.json

      return res.json({
        message: "Image uploaded and user profile updated successfully.",
        photo: user.photo,
      })
    } catch (error) {
      console.error("Error uploading image:", error)
      res
        .status(500)
        .json({ error: "An error occurred while uploading the image." })
    }
  }
)

// Login endpoint
app.post("/api-v2/auth/login", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" })
  }

  const user = await findUserByEmail(email)

  if (!user) {
    return res.status(401).json({ error: "Email not found" })
  }

  const isPasswordValid = await verifyPassword(email, password)
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Incorrect password" })
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
    },
    secretKey,
    { expiresIn: "1h" }
  )

  return res.json({ access_token: token })
})

// User profile endpoint
app.get("/api-v2/user/profile", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" })
    }

    const user = await findUserByEmail(decoded.email)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    return res.json({
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      photo: user.photo,
    })
  })
})

// Ensure uploads directory exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads")
}

// Start the server
app.listen(port, () => {
  console.log(
    `Server running on http://localhost:${port} and http://192.168.1.143:${port}`
  )
})
