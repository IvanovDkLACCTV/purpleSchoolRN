import { View, StyleSheet, Image } from "react-native"
import ThemeSwitch from "../../shared/ThemeSwitch/ThemeSwitch"
import { useTheme } from "../../shared/ThemeSwitch/ThemeContext"
import { Theme } from "../../constants/Colors"
import { ImageUploader } from "../../shared/ImageUploader/ImageUploader"
import UserAvatar from "../../entities/user/ui/UserAvatar/UserAvatar"

export default function Profile() {
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      justifyContent: "center",
      flex: 1,
      padding: 20,
      gap: 20,
    },
    bottom: {
      marginTop: "auto",
    },
    image: { width: 100, height: 100, alignSelf: "center" },
  })

  return (
    <View style={styles.container}>
      <UserAvatar user={null} />
      <ImageUploader onUpload={() => {}} />
      <View style={styles.bottom}>
        <ThemeSwitch />
      </View>
    </View>
  )
}
