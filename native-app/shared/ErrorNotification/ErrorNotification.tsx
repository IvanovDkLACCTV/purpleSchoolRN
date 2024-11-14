import React, { useEffect, useState } from "react"
import { Text, StyleSheet, Animated } from "react-native"
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins"

import { ErrorNotificationProps } from "./ErrorNotification.props"
import { Theme } from "../../constants/Colors"
import { FontSize } from "../tokens"
import { Width } from "../../constants/Sizes"

export const ErrorNotification = ({
  isDarkMode = false,
  error,
}: ErrorNotificationProps) => {
  const theme = isDarkMode ? Theme.dark : Theme.light
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  })
  const [isError, setIsError] = useState<boolean>(false)

  const animatedValue = new Animated.Value(-100)

  const onEnter = () => {
    Animated.timing(animatedValue, {
      duration: 300,
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      console.log("Login error")
    })
  }

  const styles = StyleSheet.create({
    error: {
      zIndex: 1,
      position: "absolute",
      width: Width,
      backgroundColor: theme.error,
      padding: 15,
      top: 40,
    },
    errorText: {
      color: theme.text,
      fontSize: FontSize.f16,
      fontFamily: "Poppins_400Regular",
      textAlign: "center",
    },
  })

  useEffect(() => {
    if (!error) {
      return
    }
    setIsError(true)

    const timer = setTimeout(() => setIsError(false), 3000)
    return () => clearTimeout(timer)
  }, [error])

  if (!isError) {
    return <></>
  }

  return (
    <Animated.View
      style={{ ...styles.error, transform: [{ translateY: animatedValue }] }}
      onLayout={onEnter}
    >
      <Text style={styles.errorText}>{error}</Text>
    </Animated.View>
  )
}
