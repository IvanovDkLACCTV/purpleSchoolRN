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

  const styles = StyleSheet.create({
    card: {},
    header: { flexDirection: "row", justifyContent: "space-between" },
    footer: {},
    image: { width: 100, height: 200 },
    title: {
      /* Removed color here, set it dynamically */
    },
    chips: { flexDirection: "row", flexWrap: "wrap" },
  })

  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
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
