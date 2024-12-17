const express = require("express")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const users = require("./users")
const cors = require("cors")

const app = express()
const port = 3000
const secretKey = "a-very-secret-key-123456"

app.use(bodyParser.json())
app.use(
  cors({
    origin: "http://localhost:19006",
    methods: ["GET", "POST"],
    credentials: true,
  })
)

// Log all incoming requests
app.use((req, res, next) => {
  next()
})

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
    })
  })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
