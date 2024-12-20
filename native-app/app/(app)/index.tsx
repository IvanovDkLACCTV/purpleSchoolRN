import { Text, View, StyleSheet } from "react-native"
import { Button } from "../../shared/Button/Button"
import { useSetAtom } from "jotai"
import { logoutAtom } from "../../entities/auth/model/auth.state"
import { useTheme } from "../../shared/ThemeSwitch/ThemeContext"
import { Theme } from "../../constants/Colors"
import ThemeSwitch from "../../shared/ThemeSwitch/ThemeSwitch"

export default function MyCourses() {
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

  const logout = useSetAtom(logoutAtom)
  return (
    <View style={styles.container}>
      <Text style={{ color: theme.text }}>My Courses</Text>
      <Button title="Logout" onPress={logout} isDarkMode={isDarkMode} />
      <View style={styles.bottom}>
        <ThemeSwitch />
      </View>
    </View>
  )
}
