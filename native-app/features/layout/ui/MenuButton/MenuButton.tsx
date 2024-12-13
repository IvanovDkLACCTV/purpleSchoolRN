import { View, Pressable, PressableProps, StyleSheet } from "react-native"
import MenuIcon from "../../../../assets/icons/menu"
import { useState } from "react"
import { Colors } from "../../../../shared/tokens"
import { useTheme } from "../../../../shared/ThemeContext"
import { Theme } from "../../../../constants/Colors"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MenuButton({
  navigation,
  ...props
}: PressableProps & { navigation: any }) {
  const [clicked, setClicked] = useState<boolean>(false)
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light

  return (
    <Pressable
      {...props}
      onPressIn={() => setClicked(true)}
      onPressOut={() => setClicked(false)}
      onPress={() => navigation.toggleDrawer()}
    >
      <View
        style={{
          ...styles.button,
          backgroundColor: clicked ? theme.inputBackground : theme.lighter,
        }}
      >
        <MenuIcon />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    flex: 1,
  },
})
