export interface User {
  id: number
  email: string
  password: string
  name: string
  surname: string
  photo: string
}

// Mock users database
export const users: User[] = [
  {
    id: 1,
    email: "test@test.com",
    password: "password123",
    name: "John",
    surname: "Doe",
    photo: "",
  },
]
