import { Pressable, Alert, View, Text, StyleSheet } from "react-native"
import { useState } from "react"
import {
  launchImageLibraryAsync,
  launchCameraAsync,
  PermissionStatus,
  useMediaLibraryPermissions,
  useCameraPermissions,
} from "expo-image-picker"
import FormData from "form-data"
import axios, { AxiosError } from "axios"

import UploadIcon from "../../assets/icons/upload"
import { Theme } from "../../constants/Colors"
import { useTheme } from "../ThemeSwitch/ThemeContext"
import { FontSize, Gaps, Radius } from "../tokens"
import { Fonts } from "../../constants/Fonts"
import { FILE_API } from "../api"

interface ImageUploaderProps {
  onUpload: (uri: string) => void
}

export function ImageUploader({ onUpload }: ImageUploaderProps) {
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light
  // image picker
  const [image, setImage] = useState<string | null>(null)
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    useMediaLibraryPermissions()
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
      Alert.alert(
        "Permission Required",
        "Please allow access to your photo library in settings",
        [
          { text: "OK", onPress: () => requestMediaLibraryPermission() },
          { text: "Cancel", style: "cancel" },
        ]
      )
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
      Alert.alert(
        "Permission Required",
        "Please allow access to your camera in settings"
      )
      return false
    }

    return true
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
    const result = await launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
    if (!result.assets) {
      return
    }
    const asset = result.assets[0]
    const name = asset.fileName ?? `image_${Date.now()}.jpg` // резервное имя
    await uploadToServer(asset.uri, name)
  }

  //uploading on server
  const uploadToServer = async (uri: string, fileName: string) => {
    const formData = new FormData()
    formData.append("files", {
      uri,
      name: fileName,
      type: "image/jpeg",
    })
    try {
      const { data } = await axios.post(FILE_API.uploadImage, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log(data)
      setImage(data.file.path) // обновляем состояние только с данными сервера
      onUpload(data.file.path) // передаём путь выше
    } catch (error) {
      console.error(error)
    }
  }

  //styling
  const styles = StyleSheet.create({
    uploader: {
      flexDirection: "row",
      gap: Gaps.g8,
      backgroundColor: theme.inputBackground,
      borderRadius: Radius.r10,
      paddingHorizontal: 20,
      paddingVertical: 17,
      alignItems: "center",
    },
    text: {
      color: theme.text,
      fontSize: FontSize.f14,
      fontFamily: Fonts.fontFamily,
    },
  })

  return (
    <Pressable onPress={pickImage}>
      <View style={styles.uploader}>
        <UploadIcon />
        <Text style={styles.text}>Upload Image</Text>
      </View>
    </Pressable>
  )
}
