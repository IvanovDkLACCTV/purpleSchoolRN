import React from "react"
import { Switch, StyleSheet, View } from "react-native"
import { useTheme } from "./ThemeContext"
import { Theme } from "../../constants/Colors"

const ThemeSwitch = () => {
  const { isDarkMode, setIsDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light

  return (
    <View style={styles.container}>
      <Switch
        value={isDarkMode}
        onValueChange={setIsDarkMode}
        thumbColor={theme.tint}
        trackColor={{ false: theme.lighter, true: theme.lighter }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: "auto",
  },
})

export default ThemeSwitch
