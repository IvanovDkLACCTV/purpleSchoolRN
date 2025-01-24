const express = require("express")
const router = express.Router()

// Sample course data
const courses = [
  {
    id: 1234,
    shortTitle: "Course 1",
    image: "https://192.168.1.143:3030/uploads/tony.jpeg",
    title: "Introduction to Course 1",
    alias: "course-1",
    description: "Description of Course 1",
    length: 10,
    avgRating: 4.5,
    price: 100,
    courseOnDirection: [{ direction: { name: "Direction 1" } }],
    tariffs: [
      {
        id: 1567,
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
  {
    id: 2234,
    shortTitle: "Course 2",
    image: "https://192.168.1.143:3030/uploads/bradly.jpeg",
    title: "Advanced Course 2",
    alias: "course-2",
    description: "Description of Course 2",
    length: 20,
    avgRating: 4.7,
    price: 150,
    courseOnDirection: [{ direction: { name: "Direction 2" } }],
    tariffs: [
      {
        id: 2463,
        name: "Premium",
        price: 150,
        type: "premium",
        lengthInMonth: 2,
        courseId: 2,
        createdAt: new Date().toISOString(),
        videoUuid: "uuid-2",
      },
    ],
    progress: {
      progressPercent: 30,
      tariffLessonsCount: 20,
      userViewedLessonsCount: 6,
    },
  },
  {
    id: 3657,
    shortTitle: "Course 3",
    image: "https://192.168.1.143:3030/uploads/1736936177326.jpeg",
    title: "Beginner Course 3",
    alias: "course-3",
    description: "Description of Course 3",
    length: 15,
    avgRating: 4.2,
    price: 120,
    courseOnDirection: [{ direction: { name: "Direction 3" } }],
    tariffs: [
      {
        id: 3789,
        name: "Standard",
        price: 120,
        type: "standard",
        lengthInMonth: 1,
        courseId: 3,
        createdAt: new Date().toISOString(),
        videoUuid: "uuid-3",
      },
    ],
    progress: {
      progressPercent: 10,
      tariffLessonsCount: 15,
      userViewedLessonsCount: 1,
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
