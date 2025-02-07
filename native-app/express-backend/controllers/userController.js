const jwt = require("jsonwebtoken")
const { findUserByEmail } = require("../models/userModel")
const { secretKey } = require("../config/keys")

exports.getProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ error: "Unauthorized" })

  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" })

    const user = await findUserByEmail(decoded.email)
    if (!user) return res.status(404).json({ error: "User not found" })

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo,
    })
  })
}
