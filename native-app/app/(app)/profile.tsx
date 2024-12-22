import { Text, View, StyleSheet, Image, Alert } from 'react-native'
import { useState } from 'react'
import { launchImageLibraryAsync, PermissionStatus, useCameraPermissions } from 'expo-image-picker'

import ThemeSwitch from '../../shared/ThemeSwitch/ThemeSwitch'
import { useTheme } from '../../shared/ThemeSwitch/ThemeContext'
import { Theme } from '../../constants/Colors'
import { Button } from '../../shared/Button/Button'

export default function Profile() {
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light

  // image picker
  const [image, setImage] = useState<string | null>(null)
  const [cameraPermission, requestCameraPermission] = useCameraPermissions()

  const varifyCameraPermissions = async () => {
    if (cameraPermission?.status === PermissionStatus.UNDETERMINED) {
      const res = await requestCameraPermission()
      return res.granted
    }
    if (cameraPermission?.status === PermissionStatus.DENIED) {
      Alert.alert('Allow camera for this app in phone settings')
      return false
    }
    return true
  }

  const pickImage = async () => {
    const isPermissionGranted = await varifyCameraPermissions()
    if (!isPermissionGranted) {
      return
    }
    let result = await launchImageLibraryAsync({
      mediaTypes: ['images'],
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
      justifyContent: 'center',
      flex: 1,
      padding: 20,
    },
    bottom: {
      marginTop: 'auto',
    },
  })

  return (
    <View style={styles.container}>
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 100 }}
        />
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
