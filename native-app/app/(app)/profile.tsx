import { View, StyleSheet } from "react-native"
import ThemeSwitch from "../../shared/ThemeSwitch/ThemeSwitch"
import { useTheme } from "../../shared/ThemeSwitch/ThemeContext"
import { Theme } from "../../constants/Colors"
import { ImageUploader } from "../../shared/ImageUploader/ImageUploader"
import UserAvatar from "../../entities/user/ui/UserAvatar/UserAvatar"
import { Gaps } from "../../shared/tokens"
import { useState } from "react"
import { User } from "../../entities/user/model/user.model"

interface UserMenuProps {
  user: User | null
}

export default function Profile({ user }: UserMenuProps) {
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light
  const [image, setLocalImage] = useState<string | null>(null)

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
        <UserAvatar user={user} image={image || user?.photo || null} />
        <ImageUploader
          onUpload={(uri) => {
            console.log("Uploaded image URI:", uri)
            setLocalImage(uri) // Сохраняем загруженный URL
          }}
        />
      </View>
      <View style={styles.bottom}>
        <ThemeSwitch />
      </View>
    </View>
  )
}
