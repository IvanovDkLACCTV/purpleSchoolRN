import React, { useState } from "react"
import { Image, View, StyleSheet } from "react-native"
import { User } from "../../model/user.model"

interface UserAvatarProps {
  user: User | null
  image: string | null
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, image }) => {
  return (
    <View>
      {image ? (
        <Image style={styles.image} source={{ uri: image }} />
      ) : (
        <Image source={require("../../../../assets/images/avatar.png")} />
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
