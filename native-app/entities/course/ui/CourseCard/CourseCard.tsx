import { Image, StyleSheet, Text, View } from "react-native"

import { StudentCourseDescription } from "../../model/course.model"
import { Theme } from "../../../../constants/Colors"
import { useTheme } from "../../../../shared/ThemeSwitch/ThemeContext"

const { isDarkMode, setIsDarkMode } = useTheme()
const theme = isDarkMode ? Theme.dark : Theme.light

export function CourseCard({
  image,
  title,
  courseOnDirection,
}: StudentCourseDescription) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View>
        <Text style={styles.title}>{title}</Text>
        {courseOnDirection.length > 0}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {},
  image: { width: 100, height: 200 },
  title: { color: theme.text },
})
