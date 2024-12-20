import { Stack, Link } from "expo-router"
import { View, Text, SafeAreaView, StyleSheet } from "react-native"
import { Theme } from "../constants/Colors"
import { useTheme } from "../shared/ThemeSwitch/ThemeContext"
import ThemeSwitch from "../shared/ThemeSwitch/ThemeSwitch"

export default function Restore() {
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.content}>
        <Link href="/" style={styles.link}>
          <Text style={[styles.text, { color: theme.text }]}>Restore</Text>
        </Link>
      </View>
      <View style={styles.bottom}>
        <ThemeSwitch />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
  link: {
    padding: 16,
  },
  bottom: {
    marginTop: "auto",
  },
})
