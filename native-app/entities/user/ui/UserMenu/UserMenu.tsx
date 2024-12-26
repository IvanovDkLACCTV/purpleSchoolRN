import { useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"

import { User } from "../../model/user.model"
import { FontSize, Gaps } from "../../../../shared/tokens"
import { Fonts } from "../../../../constants/Fonts"
import { useTheme } from "../../../../shared/ThemeSwitch/ThemeContext"
import { Theme } from "../../../../constants/Colors"
import UserAvatar from "../UserAvatar/UserAvatar"

interface UserMenuProps {
  user: User | null
  image: string | null
}

export function UserMenu({ user, image }: UserMenuProps) {
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light

  if (!user) {
    return null
  }

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flexDirection: "column",
      marginTop: 20,
      marginBottom: 40,
    },
    names: {
      flexDirection: "row",
      justifyContent: "space-around",
      gap: Gaps.g8,
      marginTop: Gaps.g8,
    },
    name: {
      fontSize: FontSize.f18,
      fontFamily: Fonts.fontFamily,
      color: theme.text,
    },
  })

  // Log the image prop to check if it updates
  useEffect(() => {
    console.log("Updated image in UserMenu:", image)
  }, [image])

  return (
    <View style={styles.container}>
      <UserAvatar user={user} image={image} />
      <View style={styles.names}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.name}>{user.surname}</Text>
      </View>
    </View>
  )
}
