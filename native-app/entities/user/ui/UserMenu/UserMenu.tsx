import { Image, StyleSheet, Text, View } from "react-native"
import { User } from "../../model/user.model"
import { FontSize, Gaps } from "../../../../shared/tokens"
import { Fonts } from "../../../../constants/Fonts"
import { useTheme } from "../../../../shared/ThemeSwitch/ThemeContext"
import { Theme } from "../../../../constants/Colors"
import UserAvatar from "../UserAvatar/UserAvatar"

export function UserMenu({ user }: { user: User | null }) {
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

  return (
    <View style={styles.container}>
      <UserAvatar user={user} />
      <View style={styles.names}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.name}>{user.surname}</Text>
      </View>
    </View>
  )
}
