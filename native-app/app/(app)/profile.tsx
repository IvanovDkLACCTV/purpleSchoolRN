import { Text, View, StyleSheet, Image, Alert } from 'react-native'
import { useState } from 'react'
import { launchImageLibraryAsync, launchCameraAsync, PermissionStatus, useMediaLibraryPermissions, useCameraPermissions } from 'expo-image-picker'

import ThemeSwitch from '../../shared/ThemeSwitch/ThemeSwitch'
import { useTheme } from '../../shared/ThemeSwitch/ThemeContext'
import { Theme } from '../../constants/Colors'
import { Button } from '../../shared/Button/Button'

export default function Profile() {
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light

  // image picker
  const [image, setImage] = useState<string | null>(null)
  const [mediaLibraryPermission, requestMediaLibraryPermission] = useMediaLibraryPermissions()
  const [cameraPermission, requestCameraPermission] = useCameraPermissions()

  const verifyMediaLibraryPermissions = async () => {
    if (!mediaLibraryPermission) {
      const permission = await requestMediaLibraryPermission()
      return permission.granted
    }

    if (mediaLibraryPermission.status === PermissionStatus.UNDETERMINED) {
      const permission = await requestMediaLibraryPermission()
      return permission.granted
    }

    if (mediaLibraryPermission.status === PermissionStatus.DENIED) {
      Alert.alert('Permission Required', 'Please allow access to your photo library in settings', [
        { text: 'OK', onPress: () => requestMediaLibraryPermission() },
        { text: 'Cancel', style: 'cancel' },
      ])
      return false
    }

    return mediaLibraryPermission.status === PermissionStatus.GRANTED
  }

  const verifyCameraPermissions = async () => {
    if (cameraPermission?.status === PermissionStatus.GRANTED) {
      return true
    }

    if (cameraPermission?.status === PermissionStatus.UNDETERMINED) {
      const res = await requestCameraPermission()
      return res.granted
    }

    if (cameraPermission?.status === PermissionStatus.DENIED) {
      Alert.alert('Permission Required', 'Please allow access to your camera in settings')
      return false
    }

    return false
  }

  const takePhoto = async () => {
    const isPermissionGranted = await verifyCameraPermissions()
    if (!isPermissionGranted) {
      return
    }

    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const pickImage = async () => {
    const isPermissionGranted = await verifyMediaLibraryPermissions()
    if (!isPermissionGranted) {
      return
    }
    let result = await launchImageLibraryAsync({
      mediaTypes: 'images',
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
      gap: 20,
    },
    bottom: {
      marginTop: 'auto',
    },
    image: { width: 100, height: 100, alignSelf: 'center' },
  })

  return (
    <View style={styles.container}>
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      )}
      <Button
        title="Take a photo"
        onPress={takePhoto}
        isDarkMode={isDarkMode}
      />

      <Button
        title="Pick from gallery"
        onPress={pickImage}
        isDarkMode={isDarkMode}
      />
      <View style={styles.bottom}>
        <ThemeSwitch />
      </View>
    </View>
  )
}
