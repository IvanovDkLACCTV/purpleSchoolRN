import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native"
import { useAtomValue, useSetAtom } from "jotai"

import { useTheme } from "../../shared/ThemeSwitch/ThemeContext"
import { Theme } from "../../constants/Colors"
import ThemeSwitch from "../../shared/ThemeSwitch/ThemeSwitch"
import {
  courseAtom,
  loadCourseAtom,
} from "../../entities/course/model/course.state"
import { useEffect } from "react"
import { CourseCard } from "../../entities/course/ui/CourseCard/CourseCard"
import { Gaps } from "../../shared/tokens"
import { StudentCourseDescription } from "../../entities/course/model/course.model"

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
      flexDirection: "column",
      gap: Gaps.g20,
    },
    bottom: {
      marginTop: "auto",
      backgroundColor: theme.background,
    },
    activity: { marginTop: 30 },
  })

  const loadCourse = useSetAtom(loadCourseAtom)

  useEffect(() => {
    loadCourse()
  }, [])

  const renderCourse = ({ item }: { item: StudentCourseDescription }) => {
    return (
      <View style={styles.container}>
        <CourseCard {...item} />
      </View>
    )
  }

  return (
    <>
      {isLoading && (
        <ActivityIndicator
          style={styles.activity}
          size="large"
          color={theme.preHover}
        />
      )}
      {courses.length > 0 && (
        <FlatList
          refreshControl={
            <RefreshControl
              tintColor={theme.preHover}
              titleColor={theme.text}
              refreshing={isLoading}
              onRefresh={loadCourse}
            />
          }
          data={courses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCourse}
        />
      )}
      <View style={styles.bottom}>
        <ThemeSwitch />
      </View>
    </>
  )
}
