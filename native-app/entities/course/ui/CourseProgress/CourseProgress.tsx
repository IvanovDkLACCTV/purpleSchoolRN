import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { useTheme } from "../../../../shared/ThemeSwitch/ThemeContext"
import { Theme } from "../../../../constants/Colors"
import { Radius } from "../../../../shared/tokens"

export function CourseProgress({
  progress,
  passedLessons,
  totalLessons,
}: {
  progress: {
    progressPercent: number
    tariffLessonsCount: number
    userViewedLessonsCount: number
  }
  passedLessons: number
  totalLessons: number
}) {
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light
  const progressPercentage = Math.round((passedLessons / totalLessons) * 100)

  const styles = StyleSheet.create({
    progressBarContainer: {
      width: "100%",
      height: 8,
      backgroundColor: theme.border,
      borderRadius: 5,
      marginVertical: 20,
      position: "relative",
    },
    progressBar: {
      height: "100%",
      backgroundColor: theme.progressBar,
      borderRadius: Radius.r10,
      width: `${progressPercentage}%`,
    },
    percentageTextLeft: {
      color: theme.progressBar,
    },
    percentageTextRight: {
      color: Theme.dark.border,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      position: "absolute",
      top: -24,
      width: "100%",
      paddingHorizontal: 10,
    },
  })

  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.header}>
        <Text style={styles.percentageTextLeft}>
          {progress.progressPercent}%
        </Text>
        <Text style={styles.percentageTextRight}>
          {passedLessons}/{totalLessons}
        </Text>
      </View>

      <View
        style={[styles.progressBar, { width: `${progress.progressPercent}%` }]}
      />
    </View>
  )
}
