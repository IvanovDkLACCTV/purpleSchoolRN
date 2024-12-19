import { Text, View, StyleSheet, Switch } from "react-native"
import { useTheme } from "../../shared/ThemeContext"
import { Theme } from "../../constants/Colors"

export default function Profile() {
  const { isDarkMode, setIsDarkMode } = useTheme()
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
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          thumbColor={theme.tint}
          trackColor={{ false: theme.lighter, true: theme.lighter }}
        />
      </View>
    </View>
  )
}
