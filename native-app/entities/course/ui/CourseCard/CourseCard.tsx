import { Image, Linking, StyleSheet, Text, View } from "react-native"
import React, { useState } from "react"
import MaskedView from "@react-native-masked-view/masked-view"
import { LinearGradient } from "expo-linear-gradient"
import { StudentCourseDescription } from "../../model/course.model"
import { Theme } from "../../../../constants/Colors"
import { useTheme } from "../../../../shared/ThemeSwitch/ThemeContext"
import { Chip } from "../../../../shared/Chip/Chip"
import { Button } from "../../../../shared/Button/Button"
import { FontSize, Gaps, Radius } from "../../../../shared/tokens"

export function CourseCard({
  image,
  shortTitle,
  tariffs,
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
      flexDirection: "column",
    },
    footer: {
      backgroundColor: theme.inputBackground,
      paddingHorizontal: 24,
      paddingBottom: 24,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    gradient: {
      opacity: 0,
    },
    maskView: {
      marginTop: 12,
      fontSize: FontSize.f16,
      fontFamily: "Poppins",
    },
  })

  const gradientColors = isDarkMode
    ? ([Theme.dark.preHover, Theme.dark.gradientDarkPurple] as const)
    : ([Theme.light.preHover, Theme.light.hover] as const)

  const locations = [0, 1] as const

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
        <View>
          <MaskedView
            style={styles.maskView}
            maskElement={
              <Text style={styles.gradient}>
                Plan &laquo;{tariffs[0].name}&raquo;
              </Text>
            }
          >
            <LinearGradient
              colors={gradientColors}
              locations={locations}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.gradient}>
                Plan &laquot;{tariffs[0].name}&raquo;
              </Text>
            </LinearGradient>
          </MaskedView>
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          title="Buy"
          isDarkMode={isDarkMode}
          onPress={() => Linking.openURL("https://google.com")}
        />
      </View>
    </View>
  )
}
