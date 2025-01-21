const courses = [
  {
    id: 1,
    shortTitle: "Intro to Programming",
    image: "http://192.168.1.143:3030/uploads/1736852512087.jpeg",
    title: "Introduction to Programming",
    alias: "intro-to-programming",
    length: 30,
    avgRating: 4.5,
    price: 99.99,
    courseOnDirection: [{ direction: { name: "Computer Science" } }],
    tariffs: [
      {
        id: 1,
        name: "Basic",
        price: 99.99,
        type: "basic",
        lengthInMonth: 1,
        courseId: 1,
        createdAt: "2023-01-01T00:00:00Z",
        videoUuid: "uuid-1234",
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

module.exports = { courses }
