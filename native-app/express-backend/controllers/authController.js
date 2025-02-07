const jwt = require("jsonwebtoken")
const { findUserByEmail, verifyPassword } = require("../models/userModel")
const { secretKey } = require("../config/keys")

exports.login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" })
  }

  const user = await findUserByEmail(email)
  if (!user) return res.status(401).json({ error: "Email not found" })

  const isPasswordValid = await verifyPassword(email, password)
  if (!isPasswordValid)
    return res.status(401).json({ error: "Incorrect password" })

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    secretKey,
    { expiresIn: "1h" }
  )

  return res.json({ access_token: token })
}
