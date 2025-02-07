const cors = require("cors")

const allowedOrigins = [
  "http://localhost:3030",
  "http://192.168.3.12:3030",
  "http://192.168.1.143:3030",
  "http://192.168.1.143:3000",
  "http://192.168.1.116:3030",
  "http://localhost:8081/",
  "http://localhost:3000",
]

module.exports = cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  methods: ["GET", "POST"],
  credentials: true,
})
