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
      <Image source={{ uri: image }} style={styles.image} height={200} />
      <View>
        <Text style={styles.title}>{title}</Text>
        {courseOnDirection.length > 0 &&
          courseOnDirection.map((d) => <Text>{d.direction.name}</Text>)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {},
  image: {},
  title: { color: theme.text },
})
