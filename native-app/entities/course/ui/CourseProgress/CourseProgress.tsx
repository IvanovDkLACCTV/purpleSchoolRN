import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { useTheme } from "../../../../shared/ThemeSwitch/ThemeContext"
import { Theme } from "../../../../constants/Colors"
import { Radius } from "../../../../shared/tokens"

export function CourseProgress({
  progress,
}: {
  progress: {
    progressPercent: number
    tariffLessonsCount: number
    userViewedLessonsCount: number
  }
}) {
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light
  const progressPercentage = progress.progressPercent

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
      backgroundColor: theme.preHover,
      borderRadius: Radius.r10,
      width: `${progressPercentage}%`,
    },
    percentageText: {
      position: "absolute",
      left: 0,
      top: -24,
      color: theme.text,
    },
  })

  return (
    <View style={styles.progressBarContainer}>
      <Text style={styles.percentageText}>{progress.progressPercent}%</Text>
      <View
        style={[styles.progressBar, { width: `${progress.progressPercent}%` }]}
      />
    </View>
  )
}
