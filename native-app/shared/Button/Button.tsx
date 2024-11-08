import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  Pressable,
  View,
  Animated,
} from "react-native";
import { Theme } from "../../constants/Colors";
import { Radius, FontSize } from "../tokens";
import { useEffect } from "react";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  isDarkMode?: boolean;
}

export const Button = ({
  title,
  isDarkMode = false,
  style,
  ...props
}: ButtonProps) => {
  const animatedValue = new Animated.ValueXY({
    //величина, которая будет изменяться
    x: 0,
    y: 0,
  });
  const theme = isDarkMode ? Theme.dark : Theme.light;
  Animated.spring(animatedValue, {
    //анимация
    toValue: { x: 100, y: 100 },
    useNativeDriver: false,
  }).start();

  return (
    <Pressable {...props}>
      <Animated.View
        style={[
          styles.button,
          {
            backgroundColor: theme.tint,
            width: animatedValue.x,
            height: animatedValue.y,
          },
        ]}
      >
        <Text style={[styles.buttonText, { color: Theme.dark.text }]}>
          {title}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: Radius.r10,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins_400Regular",
    fontSize: FontSize.f16,
  },
});
