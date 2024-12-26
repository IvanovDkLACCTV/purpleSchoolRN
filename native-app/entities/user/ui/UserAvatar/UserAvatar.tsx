import React, { useState } from "react"
import { Image, View, StyleSheet } from "react-native"
import { User } from "../../model/user.model"

interface UserAvatarProps {
  user: User | null
  image: string | null
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, image }) => {
  const defaultAvatar = require("../../../../assets/images/avatar.png")
  const [loadedImage, setLoadedImage] = useState<string | null>(image)

  return (
    <View>
      {loadedImage ? (
        <Image
          style={styles.image}
          source={{ uri: loadedImage }}
          onError={() => setLoadedImage(null)} // Устанавливаем null при ошибке загрузки
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
  },
})

export default UserAvatar
