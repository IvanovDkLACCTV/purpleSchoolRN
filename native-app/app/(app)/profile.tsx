import { Text, View, StyleSheet, Image } from "react-native"
import { useState } from "react"
import * as ImagePicker from "expo-image-picker"

import ThemeSwitch from "../../shared/ThemeSwitch/ThemeSwitch"
import { useTheme } from "../../shared/ThemeSwitch/ThemeContext"
import { Theme } from "../../constants/Colors"
import { Button } from "../../shared/Button/Button"

export default function Profile() {
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light

  // image picker
  const [image, setImage] = useState<string | null>(null)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      justifyContent: "center",
      flex: 1,
      padding: 20,
    },
    bottom: {
      marginTop: "auto",
    },
  })

  return (
    <View style={styles.container}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
      )}
      <Button
        title="Pick an avatar"
        onPress={pickImage}
        isDarkMode={isDarkMode}
      />
      <View style={styles.bottom}>
        <ThemeSwitch />
      </View>
    </View>
  )
}
