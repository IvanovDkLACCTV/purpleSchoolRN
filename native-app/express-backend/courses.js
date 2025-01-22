const express = require("express")
const router = express.Router()

// Sample course data
const courses = [
  {
    id: 1,
    shortTitle: "Course 1",
    image: "https://192.168.1.143:3030/express-backend/uploads/tony.jpeg",
    title: "Introduction to Course 1",
    alias: "course-1",
    length: 10,
    avgRating: 4.5,
    price: 100,
    courseOnDirection: [{ direction: { name: "Direction 1" } }],
    tariffs: [
      {
        id: 1,
        name: "Basic",
        price: 100,
        type: "basic",
        lengthInMonth: 1,
        courseId: 1,
        createdAt: new Date().toISOString(),
        videoUuid: "uuid-1",
      },
    ],
    progress: {
      progressPercent: 50,
      tariffLessonsCount: 10,
      userViewedLessonsCount: 5,
    },
  },
  // Add more courses as needed
]

// Get all courses
router.get("/courses", (req, res) => {
  res.json(courses)
})

// Get a course by alias
router.get("/courses/:alias", (req, res) => {
  const course = courses.find((c) => c.alias === req.params.alias)
  if (course) {
    res.json(course)
  } else {
    res.status(404).json({ error: "Course not found" })
  }
})

module.exports = router
