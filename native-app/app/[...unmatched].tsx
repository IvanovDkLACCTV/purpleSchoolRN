import { Image, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Theme } from "../constants/Colors"
import { FontSize, Gaps } from "../shared/tokens"
import { useTheme } from "../shared/ThemeSwitch/ThemeContext"
import { CustomLink } from "../shared/CustomLink/CustomLink"
import ThemeSwitch from "../shared/ThemeSwitch/ThemeSwitch"
import { Width } from "../constants/Sizes"

export default function UnmatchedCustom() {
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={require("../assets/images/unmatched.png")}
          resizeMode="contain"
        />
        <Text style={[styles.text, { color: theme.text }]}>
          Wow, dude... Something went wrong. Try to get back to the &nbsp;
          <CustomLink href="/login" text="Homepage" />
        </Text>
      </View>
      <View style={styles.bottom}>
        <ThemeSwitch />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    padding: 55,
  },
  content: {
    alignItems: "center",
    gap: Gaps.g50,
  },
  image: {
    width: 204,
    height: 282,
  },
  text: {
    fontSize: FontSize.f18,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  bottom: {
    position: "absolute",
    bottom: Width * 0.1,
    right: Width * 0.1,
    zIndex: 1,
  },
})
