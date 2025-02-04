import { Image, StyleSheet, Text, View } from "react-native"
import { StudentCourseDescription } from "../../model/course.model"
import { Theme } from "../../../../constants/Colors"
import { useTheme } from "../../../../shared/ThemeSwitch/ThemeContext"
import { Chip } from "../../../../shared/Chip/Chip"
import { Button } from "../../../../shared/Button/Button"
import { FontSize, Gaps, Radius } from "../../../../shared/tokens"
import React, { useState } from "react"

export function CourseCard({
  image,
  shortTitle,
  courseOnDirection,
}: StudentCourseDescription) {
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light
  const [imageError, setImageError] = useState(false)

  const styles = StyleSheet.create({
    card: {
      flexDirection: "column",
      borderRadius: Radius.r10,
      backgroundColor: theme.inputBackground,
    },
    image: {
      width: "100%",
      height: 200,
      borderRadius: Radius.r10,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    imagePlaceholder: {
      width: "100%",
      height: 200,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.border,
      borderRadius: Radius.r10,
    },
    title: {
      fontFamily: "Poppins",
      fontSize: FontSize.f21,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 12,
    },
    chips: {
      flexDirection: "row",
      gap: Gaps.g10,
    },
    header: {
      paddingHorizontal: 24,
      paddingVertical: 18,
    },
    footer: {
      backgroundColor: theme.inputBackground,
      paddingHorizontal: 24,
      paddingVertical: 20,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
  })

  return (
    <View style={styles.card}>
      {!imageError ? (
        <Image
          source={{ uri: image }}
          style={styles.image}
          height={200}
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={{ color: theme.text }}>Image not available</Text>
        </View>
      )}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>{shortTitle}</Text>
        <View style={styles.chips}>
          {courseOnDirection.length > 0 &&
            courseOnDirection.map((c, index) => (
              <Chip key={index} text={c.direction.name} />
            ))}
        </View>
      </View>
      <View style={styles.footer}>
        <Button title="Buy" isDarkMode={isDarkMode} />
      </View>
    </View>
  )
}
