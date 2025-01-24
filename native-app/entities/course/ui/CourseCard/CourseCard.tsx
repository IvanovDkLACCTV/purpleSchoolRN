import { Image, StyleSheet, Text, View } from "react-native"
import { StudentCourseDescription } from "../../model/course.model"
import { Theme } from "../../../../constants/Colors"
import { useTheme } from "../../../../shared/ThemeSwitch/ThemeContext"
import { Chip } from "../../../../shared/Chip/Chip"
import { Button } from "../../../../shared/Button/Button"

export function CourseCard({
  image,
  title,
  courseOnDirection,
}: StudentCourseDescription) {
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light

  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} height={200} />
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <View style={styles.chips}>
          {courseOnDirection.length > 0 &&
            courseOnDirection.map((c, index) => (
              <Chip key={index} text={c.direction.name} />
            ))}
        </View>
      </View>
      <View style={styles.footer}>
        <Button title="Buy" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {},
  image: {},
  title: {},
  chips: {},
  header: {},
  footer: {},
})
