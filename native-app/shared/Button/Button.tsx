import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  Pressable,
  View,
} from "react-native";
import { Theme } from "../../constants/Colors";
import { Radius, FontSize } from "../tokens";

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
  const theme = isDarkMode ? Theme.dark : Theme.light;

  return (
    <Pressable {...props}>
      <View style={[styles.button, { backgroundColor: theme.tint }, style]}>
        <Text style={[styles.buttonText, { color: Theme.dark.text }]}>
          {title}
        </Text>
      </View>
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
