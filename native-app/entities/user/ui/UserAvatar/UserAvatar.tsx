import React from "react"
import { Image, View, StyleSheet } from "react-native"
import { User } from "../../model/user.model"
import { Gaps } from "../../../../shared/tokens"

interface UserAvatarProps {
  user: User | null
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  return (
    <View>
      {user?.photo ? (
        <Image style={styles.image} source={{ uri: user.photo }} />
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
