import {
  DrawerContentComponentProps,
  DrawerNavigationHelpers,
} from "@react-navigation/drawer/lib/typescript/commonjs/src/types"
import { ReactNode, useState } from "react"
import { Pressable, PressableProps, View, Text, StyleSheet } from "react-native"

import { useTheme } from "../../../../shared/ThemeContext"
import { Theme } from "../../../../constants/Colors"
import { FontSize, Gaps } from "../../../../shared/tokens"
import { Fonts } from "../../../../constants/Fonts"

interface MenuItemProps {
  drawer: DrawerContentComponentProps
  icon: ReactNode
  text: string
  path: string
}

export function MenuItem({
  drawer,
  icon,
  text,
  path,
  ...props
}: MenuItemProps & PressableProps) {
  const [clicked, setClicked] = useState<boolean>(false)
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light

  const styles = StyleSheet.create({
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
      gap: Gaps.g20,
      paddingHorizontal: 24,
      paddingVertical: 16,
      alignItems: "center",
      borderRightWidth: 5,
    },
    text: {
      color: theme.text,
      fontSize: FontSize.f16,
      fontFamily: Fonts.fontFamily,
    },
  })
  const isActive = drawer.state.routes[drawer.state.index].name === path
  return (
    <Pressable
      {...props}
      onPress={() => drawer.navigation.navigate(path)}
      onPressIn={() => setClicked(true)}
      onPressOut={() => setClicked(false)}
    >
      <View
        style={{
          ...styles.item,
          borderColor: clicked || isActive ? theme.preHover : "transparent",
          backgroundColor: clicked || isActive ? theme.hover : "transparent",
        }}
      >
        <Text>{icon}</Text> <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  )
}
