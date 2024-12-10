import {
  StyleSheet,
  Text,
  TouchableOpacityProps,
  Pressable,
  Animated,
  GestureResponderEvent,
  ActivityIndicator,
} from "react-native"
import { Theme } from "../../constants/Colors"
import { Radius, FontSize } from "../tokens"
import { isLoading } from "expo-font"

interface ButtonProps extends TouchableOpacityProps {
  title: string
  isDarkMode?: boolean
}

export const Button = ({
  title,
  isDarkMode = false,
  style,
  isLoading = false,
  ...props
}: ButtonProps & { isDarkMode?: boolean; isLoading?: boolean }) => {
  const theme = isDarkMode ? Theme.dark : Theme.light
  const animatedValue = new Animated.Value(100)
  const color = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [theme.hover, theme.preHover],
  })

  const fadeIn = (e: GestureResponderEvent) => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
    props.onPressIn && props.onPressIn(e)
  }

  const fadeOut = (e: GestureResponderEvent) => {
    Animated.timing(animatedValue, {
      toValue: 100,
      duration: 200,
      useNativeDriver: false,
    }).start()
    props.onPressOut && props.onPressOut(e)
  }

  return (
    <Pressable {...props} onPressIn={fadeIn} onPressOut={fadeOut}>
      <Animated.View
        style={[
          styles.button,
          {
            backgroundColor: color,
          },
        ]}
      >
        {!isLoading && (
          <Text style={[styles.buttonText, { color: Theme.dark.text }]}>
            {title}
          </Text>
        )}
        {isLoading && (
          <ActivityIndicator size={"large"} color={Theme.dark.text} />
        )}
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: Radius.r10,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins",
    fontSize: FontSize.f16,
  },
})
