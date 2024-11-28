import { Application, Router, oakCors, RouterContext } from "./deps.ts"
import { users } from "./users.ts"

const router = new Router()
const app = new Application()

// Login endpoint
router.post("/api/auth/login", async (ctx: RouterContext) => {
  try {
    const body = await ctx.request.body().value
    const { email, password } = body

    const user = users.find((u) => u.email === email)

    if (!user || user.password !== password) {
      ctx.response.status = 401
      ctx.response.body = { error: "Invalid credentials" }
      return
    }

    // Generate a JWT token here
    const accessToken = "your_generated_jwt_token" // Replace with actual token generation logic

    ctx.response.body = {
      access_token: accessToken,
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        photo: user.photo,
      },
    }
  } catch (error) {
    ctx.response.status = 500
    ctx.response.body = { error: "Internal server error" }
  }

  // CORS
  app.use(oakCors())

  // Router middleware
  app.use(router.routes())
  app.use(router.allowedMethods())

  // Start server
  console.log("Server running on http://localhost:3000")
  await app.listen({ port: 3000 })
})
