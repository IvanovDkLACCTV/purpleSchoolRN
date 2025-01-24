import { StyleSheet, Text, View } from "react-native"
import { useTheme } from "../ThemeSwitch/ThemeContext"
import { Theme } from "../../constants/Colors"
import { FontSize, Radius } from "../tokens"
import { Fonts } from "../../constants/Fonts"

export function Chip({ text }: { text: string }) {
  const { isDarkMode, setIsDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: Radius.r17,
      backgroundColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontFamily: Fonts.fontFamily,
      fontSize: FontSize.f14,
      color: theme.text,
    },
  })

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}
