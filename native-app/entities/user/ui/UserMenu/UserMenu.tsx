import { Image, StyleSheet, Text, View } from "react-native"
import { User } from "../../model/user.model"
import { FontSize, Gaps } from "../../../../shared/tokens"
import { Fonts } from "../../../../constants/Fonts"
import { useTheme } from "../../../../shared/ThemeContext"
import { Theme } from "../../../../constants/Colors"

export function UserMenu({ user }: { user: User | null }) {
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light
  if (!user) {
    return
  }
  const styles = StyleSheet.create({
    contailer: {
      alignItems: "center",
      flexDirection: "column",
      marginTop: 20,
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 30,
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
    <View style={styles.contailer}>
      <View>
        {user.photo ? (
          <Image style={styles.image} source={{ uri: user.photo }} />
        ) : (
          <Image source={require("../../../../assets/images/avatar.png")} />
        )}
      </View>
      <View style={styles.names}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.name}>{user.surname}</Text>
      </View>
    </View>
  )
}
