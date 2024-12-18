import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/commonjs/src/types"
import { ReactNode, useState } from "react"
import { Pressable, PressableProps, View, Text, StyleSheet } from "react-native"

import { useTheme } from "../../../../shared/ThemeContext"
import { Theme } from "../../../../constants/Colors"
import { opacity } from "react-native-reanimated/lib/typescript/Colors"

interface MenuItemProps {
  navigation: DrawerNavigationHelpers
  icon: ReactNode
  text: string
  path: string
}

export function MenuItem({
  navigation,
  icon,
  text,
  path,
  ...props
}: MenuItemProps & PressableProps) {
  const [clicked, setClicked] = useState<boolean>(false)
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light

  const syles = StyleSheet.create({
    container: {
      flexDirection: "column",
      gap: 10,
      padding: 10,
    },
    button: {
      opacity: clicked ? 0.5 : 1,
    },
    item: {
      flexDirection: "row",
      gap: 20,
    },
  })

  return (
    <Pressable
      {...props}
      onPress={() => navigation.navigate(path)}
      onPressIn={() => setClicked(true)}
      onPressOut={() => setClicked(false)}
    >
      <View style={syles.item}>
        {icon} <Text>{text}</Text>
      </View>
    </Pressable>
  )
}
