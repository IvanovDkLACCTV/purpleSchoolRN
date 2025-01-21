import {
  View,
  StyleSheet,
  Text,
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
import { StudentCourseDescription } from "../../entities/course/model/course.model"
import { Colors } from "../../shared/tokens"

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
    item: {
      padding: 20,
    },
    activity: {
      marginTop: 30,
    },
  })

  const loadCourse = useSetAtom(loadCourseAtom)

  useEffect(() => {
    loadCourse()
  }, [])

  const renderCourse = ({ item }: { item: StudentCourseDescription }) => {
    return (
      <View style={styles.item}>
        <CourseCard {...item} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {isLoading && (
        <ActivityIndicator
          style={styles.activity}
          size="large"
          color={Colors.primary}
        />
      )}
      {courses.length > 0 ? (
        <FlatList
          refreshControl={
            <RefreshControl
              tintColor={Colors.primary}
              titleColor={Colors.primary}
              refreshing={isLoading}
              onRefresh={loadCourse}
            />
          }
          data={courses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCourse}
        />
      ) : (
        <Text>No courses available</Text>
      )}
      <View style={styles.bottom}>
        <ThemeSwitch />
      </View>
    </View>
  )
}
