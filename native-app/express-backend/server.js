const express = require("express")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const users = require("./users")
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
app.use(
  cors({
    origin: "http://192.168.1.143:3030",
    methods: ["GET", "POST"],
    credentials: true,
  })
)

// Serve static files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Log all incoming requests (debugging purpose)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`)
  next()
})

// Image upload endpoint
app.post("/api-v2/files/upload-image", upload.single("files"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." })
  }

  const filePath = `/uploads/${req.file.filename}`

  return res.json({
    message: "File uploaded successfully",
    file: {
      path: `${req.protocol}://${req.get("host")}${filePath}`,
    },
  })
})

// Login endpoint
app.post("/api-v2/auth/login", (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" })
  }

  const user = users.find((u) => u.email === email)

  if (!user) {
    return res.status(401).json({ error: "Email not found" })
  }

  if (user.password !== password) {
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
app.get("/api-v2/user/profile", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" })
    }

    const user = users.find((u) => u.id === decoded.id)
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

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads")
}

app.listen(port, () => {
  console.log(`Server running on http://192.168.1.143:${port}`)
})
