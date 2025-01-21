import { Image, StyleSheet, Text, View } from "react-native"

import { StudentCourseDescription } from "../../model/course.model"
import { Theme } from "../../../../constants/Colors"
import { useTheme } from "../../../../shared/ThemeSwitch/ThemeContext"
import { Chip } from "../../../../shared/Chip/Chip"
import { Button } from "../../../../shared/Button/Button"

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
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.chips}>
          {courseOnDirection.length > 0 &&
            courseOnDirection.map((c) => <Chip text={c.direction.name} />)}
        </View>
      </View>
      <View style={styles.footer}>
        <Button title="To buy" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {},
  header: { flexDirection: "row", justifyContent: "space-between" },
  footer: {},
  image: { width: 100, height: 200 },
  title: { color: theme.text },
  chips: { flexDirection: "row", flexWrap: "wrap" },
})
