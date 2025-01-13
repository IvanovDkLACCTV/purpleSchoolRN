const bcrypt = require("bcrypt")

const users = [
  {
    id: "1",
    name: "Bradly",
    surname: "Doe",
    email: "user@example.com",
    photo: "",
    password: "password123",
  },
  {
    id: "2",
    name: "Tony",
    surname: "Stark",
    email: "user@mail.com",
    photo: "http://localhost:3030/uploads/tony.jpeg",
    password: "123456",
  },
]

;(async () => {
  const saltRounds = 10
  for (const user of users) {
    user.password = await bcrypt.hash(user.password, saltRounds)
  }

  console.log(JSON.stringify(users, null, 2))
})()
