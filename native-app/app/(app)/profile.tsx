import { Text, View, StyleSheet } from "react-native"
import { useTheme } from "../../shared/ThemeSwitch/ThemeContext"
import { Theme } from "../../constants/Colors"
import ThemeSwitch from "../../shared/ThemeSwitch/ThemeSwitch"

export default function Profile() {
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      justifyContent: "center",
      flex: 1,
      padding: 20,
    },
    bottom: {
      marginTop: "auto",
    },
  })

  return (
    <View style={styles.container}>
      <Text style={{ color: theme.text }}>My Profile</Text>
      <View style={styles.bottom}>
        <ThemeSwitch />
      </View>
    </View>
  )
}
