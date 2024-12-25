import { View, StyleSheet } from "react-native"
import ThemeSwitch from "../../shared/ThemeSwitch/ThemeSwitch"
import { useTheme } from "../../shared/ThemeSwitch/ThemeContext"
import { Theme } from "../../constants/Colors"
import { ImageUploader } from "../../shared/ImageUploader/ImageUploader"
import UserAvatar from "../../entities/user/ui/UserAvatar/UserAvatar"
import { Gaps } from "../../shared/tokens"
import { useState } from "react"

export default function Profile() {
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light
  const [image, setImage] = useState<string | null>(null)

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      justifyContent: "center",
      flex: 1,
      padding: 20,
      gap: Gaps.g20,
    },
    header: {
      flexDirection: "row",
      paddingHorizontal: Gaps.g32,
      paddingVertical: Gaps.g20,
      alignItems: "center",
      gap: Gaps.g32,
    },
    bottom: {
      marginTop: "auto",
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <UserAvatar user={null} image={image} />
        <ImageUploader onUpload={(uri) => setImage(uri)} />
      </View>
      <View style={styles.bottom}>
        <ThemeSwitch />
      </View>
    </View>
  )
}
