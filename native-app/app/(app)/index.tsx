import { View, StyleSheet } from "react-native"
import { useAtomValue, useSetAtom } from "jotai"
import { logoutAtom } from "../../entities/auth/model/auth.state"
import { useTheme } from "../../shared/ThemeSwitch/ThemeContext"
import { Theme } from "../../constants/Colors"
import ThemeSwitch from "../../shared/ThemeSwitch/ThemeSwitch"
import {
  courseAtom,
  loadCourseAtom,
} from "../../entities/course/model/course.state"
import { useEffect } from "react"
import { CourseCard } from "../../entities/course/ui/CourseCard/CourseCard"

export default function MyCourses() {
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light
  const { isLoading, error, courses } = useAtomValue(courseAtom)

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      justifyContent: "center",
      flex: 1,
      padding: 20,
    },
    bottom: {
      marginTop: "auto",
    },
  })

  const loadCourse = useSetAtom(loadCourseAtom)

  useEffect(() => {
    loadCourse()
  }, [])

  return (
    <View style={styles.container}>
      {courses.length > 0 &&
        courses.map((c) => (
          <CourseCard
            key={c.id}
            id={c.id}
            image={c.image}
            title={c.title}
            courseOnDirection={c.courseOnDirection}
            shortTitle={c.shortTitle}
            alias={c.alias}
            description={c.description}
            length={c.length}
            avgRating={c.avgRating}
            price={c.price}
            tariffs={c.tariffs}
            progress={c.progress}
          />
        ))}
      <View style={styles.bottom}>
        <ThemeSwitch />
      </View>
    </View>
  )
}
