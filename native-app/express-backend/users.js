const fs = require("fs").promises
const bcrypt = require("bcrypt")
const path = require("path")

const usersPath = path.join(__dirname, "users.json")

// Load users from file
async function loadUsers() {
  const data = await fs.readFile(usersPath, "utf8")
  return JSON.parse(data)
}

// Save users to file
async function saveUsers(users) {
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2))
}

// Find user by email
async function findUserByEmail(email) {
  const users = await loadUsers()
  return users.find((user) => user.email === email)
}

// Add new user
async function addUser({ name, surname, email, password, photo = "" }) {
  const users = await loadUsers()
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = {
    id: (users.length + 1).toString(),
    name,
    surname,
    email,
    photo,
    password: hashedPassword,
  }
  users.push(newUser)
  await saveUsers(users)
  return newUser
}

// Verify user password
async function verifyPassword(email, password) {
  const user = await findUserByEmail(email)
  if (!user) return false
  return bcrypt.compare(password, user.password)
}

module.exports = {
  loadUsers,
  saveUsers,
  findUserByEmail,
  addUser,
  verifyPassword,
}
