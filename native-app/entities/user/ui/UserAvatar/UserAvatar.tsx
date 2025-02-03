import React, { useState, useEffect } from "react"
import { Image, View, StyleSheet } from "react-native"
import { User } from "../../model/user.model"

interface UserAvatarProps {
  user: User | null
  image: string | null
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, image }) => {
  const defaultAvatar = require("../../../../assets/images/avatar.png")
  const [loadedImage, setLoadedImage] = useState<string | null>(image || null)

  useEffect(() => {
    if (image) {
      setLoadedImage(image) // Устанавливаем изображение только если оно не null
    }
  }, [image])

  const cacheBustingUrl = loadedImage ? `${loadedImage}?t=${Date.now()}` : null

  return (
    <View>
      {cacheBustingUrl ? (
        <Image
          style={styles.image}
          source={{ uri: cacheBustingUrl }}
          onError={(e) => {
            console.error("Image load error:", e.nativeEvent, cacheBustingUrl)
            setLoadedImage(null)
          }}
        />
      ) : (
        <Image style={styles.image} source={defaultAvatar} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    resizeMode: "cover",
  },
})

export default UserAvatar
