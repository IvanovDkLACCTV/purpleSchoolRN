const express = require("express")
const router = express.Router()
const { courses } = require("./data") // Assuming you have a data file or database

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

// Create a new course
router.post("/courses", (req, res) => {
  const newCourse = req.body // Ensure you validate this data
  courses.push(newCourse)
  res.status(201).json(newCourse)
})

// Update a course
router.put("/courses/:id", (req, res) => {
  const { id } = req.params
  const index = courses.findIndex((c) => c.id === parseInt(id))
  if (index !== -1) {
    courses[index] = { ...courses[index], ...req.body }
    res.json(courses[index])
  } else {
    res.status(404).json({ error: "Course not found" })
  }
})

// Delete a course
router.delete("/courses/:id", (req, res) => {
  const { id } = req.params
  const index = courses.findIndex((c) => c.id === parseInt(id))
  if (index !== -1) {
    courses.splice(index, 1)
    res.status(204).send()
  } else {
    res.status(404).json({ error: "Course not found" })
  }
})

module.exports = router
