import { Text, View, StyleSheet, Switch } from "react-native"
import { Button } from "../../shared/Button/Button"
import { useSetAtom } from "jotai"
import { logoutAtom } from "../../entities/auth/model/auth.state"
import { useTheme } from "../../shared/ThemeContext"
import { Theme } from "../../constants/Colors"

export default function MyCourses() {
  const { isDarkMode, setIsDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light

  const logout = useSetAtom(logoutAtom)
  return (
    <View style={styles.container}>
      <Text style={{ color: theme.text }}>My Courses</Text>
      <Button title="Logout" onPress={logout} isDarkMode={isDarkMode} />
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.light.background,
    justifyContent: "center",
    flex: 1,
    padding: 20,
  },
  bottom: {
    marginTop: "auto",
  },
})
