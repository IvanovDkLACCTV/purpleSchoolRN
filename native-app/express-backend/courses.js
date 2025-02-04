const express = require("express")
const router = express.Router()

// Sample course data
const courses = [
  {
    id: 1234,
    shortTitle: "Course 1",
    image: "http://192.168.1.143:3030/api-v2/uploads/tony.jpeg",
    title: "Introduction to Course 1",
    alias: "course-1",
    description: "Description of Course 1",
    length: 10,
    avgRating: 4.5,
    price: 100,
    courseOnDirection: [
      { direction: { name: "Frontend", id: 1 } },
      { direction: { name: "Backend", id: 2 } },
    ],
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
    courseOnDirection: [{ direction: { name: "Backend", id: 2 } }],
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
    courseOnDirection: [
      { direction: { name: "Devops", id: 3 } },
      { direction: { name: "Backend", id: 2 } },
    ],
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
  {
    id: 4568,
    shortTitle: "Course 4",
    image: "https://192.168.1.143:3030/uploads/course4.jpeg",
    title: "Intermediate Course 4",
    alias: "course-4",
    description: "Description of Course 4",
    length: 12,
    avgRating: 4.6,
    price: 110,
    courseOnDirection: [{ direction: { name: "Frontend", id: 1 } }],
    tariffs: [
      {
        id: 4568,
        name: "Basic",
        price: 110,
        type: "basic",
        lengthInMonth: 1,
        courseId: 4,
        createdAt: new Date().toISOString(),
        videoUuid: "uuid-4",
      },
    ],
    progress: {
      progressPercent: 20,
      tariffLessonsCount: 12,
      userViewedLessonsCount: 2,
    },
  },
  {
    id: 5678,
    shortTitle: "Course 5",
    image: "https://192.168.1.143:3030/uploads/course5.jpeg",
    title: "Advanced Course 5",
    alias: "course-5",
    description: "Description of Course 5",
    length: 18,
    avgRating: 4.8,
    price: 160,
    courseOnDirection: [{ direction: { name: "Backend", id: 2 } }],
    tariffs: [
      {
        id: 5678,
        name: "Premium",
        price: 160,
        type: "premium",
        lengthInMonth: 2,
        courseId: 5,
        createdAt: new Date().toISOString(),
        videoUuid: "uuid-5",
      },
    ],
    progress: {
      progressPercent: 40,
      tariffLessonsCount: 18,
      userViewedLessonsCount: 7,
    },
  },
  {
    id: 6789,
    shortTitle: "Course 6",
    image: "https://192.168.1.143:3030/uploads/course6.jpeg",
    title: "Expert Course 6",
    alias: "course-6",
    description: "Description of Course 6",
    length: 25,
    avgRating: 4.9,
    price: 200,
    courseOnDirection: [{ direction: { name: "Devops", id: 3 } }],
    tariffs: [
      {
        id: 6789,
        name: "Standard",
        price: 200,
        type: "standard",
        lengthInMonth: 3,
        courseId: 6,
        createdAt: new Date().toISOString(),
        videoUuid: "uuid-6",
      },
    ],
    progress: {
      progressPercent: 5,
      tariffLessonsCount: 25,
      userViewedLessonsCount: 1,
    },
  },
  {
    id: 7890,
    shortTitle: "Course 7",
    image: "https://192.168.1.143:3030/uploads/course7.jpeg",
    title: "Beginner Course 7",
    alias: "course-7",
    description: "Description of Course 7",
    length: 14,
    avgRating: 4.3,
    price: 130,
    courseOnDirection: [{ direction: { name: "Frontend", id: 1 } }],
    tariffs: [
      {
        id: 7890,
        name: "Basic",
        price: 130,
        type: "basic",
        lengthInMonth: 1,
        courseId: 7,
        createdAt: new Date().toISOString(),
        videoUuid: "uuid-7",
      },
    ],
    progress: {
      progressPercent: 15,
      tariffLessonsCount: 14,
      userViewedLessonsCount: 3,
    },
  },
  {
    id: 8901,
    shortTitle: "Course 8",
    image: "https://192.168.1.143:3030/uploads/course8.jpeg",
    title: "Advanced Course 8",
    alias: "course-8",
    description: "Description of Course 8",
    length: 22,
    avgRating: 4.4,
    price: 170,
    courseOnDirection: [{ direction: { name: "Backend", id: 2 } }],
    tariffs: [
      {
        id: 8901,
        name: "Premium",
        price: 170,
        type: "premium",
        lengthInMonth: 2,
        courseId: 8,
        createdAt: new Date().toISOString(),
        videoUuid: "uuid-8",
      },
    ],
    progress: {
      progressPercent: 25,
      tariffLessonsCount: 22,
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
