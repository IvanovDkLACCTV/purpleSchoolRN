import { View, StyleSheet } from "react-native"
import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import * as Sharing from "expo-sharing"

import ThemeSwitch from "../../shared/ThemeSwitch/ThemeSwitch"
import { useTheme } from "../../shared/ThemeSwitch/ThemeContext"
import { Theme } from "../../constants/Colors"
import { ImageUploader } from "../../shared/ImageUploader/ImageUploader"
import UserAvatar from "../../entities/user/ui/UserAvatar/UserAvatar"
import { Gaps } from "../../shared/tokens"
import { updateProfileAtom } from "../../entities/user/model/user.state"
import { User } from "../../entities/user/model/user.model"
import { Button } from "../../shared/Button/Button"
import { FILE_API } from "../../shared/api"
import { authAtom } from "../../entities/auth/model/auth.state"
import { API } from "../../entities/auth/api/api"

interface UserMenuProps {
  user: User | null
}

export default function Profile({ user }: UserMenuProps) {
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light
  const [image, setLocalImage] = useState<string | null>(null)
  const [profile, updateProfile] = useAtom(updateProfileAtom)
  const [authState] = useAtom(authAtom)
  const access_token = authState.access_token
  const [userId, setUserId] = useState<string | null>(null)

  const shareProfile = async () => {
    const isAvailableAsync = await Sharing.isAvailableAsync()
    if (!isAvailableAsync) {
      return
    }
    if (isAvailableAsync) {
      await Sharing.shareAsync("http://localhost:3030", {
        dialogTitle: "Share profile",
      })
    }
  }

  const submitProfile = async () => {
    if (!image) return
    if (profile && profile.profile) {
      try {
        const response = await fetch(FILE_API.uploadImage, {
          method: "POST",
          body: JSON.stringify({ photo: image }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        })
        const data = await response.json()
        if (response.ok) {
          updateProfile({ photo: data.photo })
          setLocalImage(data.photo)
        } else {
          console.error("Error uploading image:", data.error)
        }
      } catch (error) {
        console.error("Error uploading image:", error)
      }
    }
  }

  useEffect(() => {
    if (profile && profile.profile?.photo) {
      setLocalImage(profile.profile?.photo)
    }
  }, [image])

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(API.profile, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        const data = await response.json()
        if (response.ok) {
          setUserId(data.id)
        } else {
          console.error("Error fetching user profile:", data.error)
        }
      } catch (error) {
        console.error("Error fetching user profile:", error)
      }
    }

    fetchUserProfile()
  }, [access_token])

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
          onUpload={setLocalImage}
          onError={(error) => {
            console.error("Image upload error:", error)
          }}
          userId={userId}
        />
      </View>
      <View>
        <Button title="Save" onPress={submitProfile} isDarkMode={isDarkMode} />
      </View>
      <View>
        <Button title="Share" onPress={shareProfile} isDarkMode={isDarkMode} />
      </View>
      <View style={styles.bottom}>
        <ThemeSwitch />
      </View>
    </View>
  )
}
