import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Theme } from "../../constants/Colors";
import { Radius } from "../tokens";

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
    <TouchableOpacity
      style={[styles.button, { backgroundColor: theme.tint }, style]}
      {...props}
    >
      <Text style={[styles.buttonText, { color: "white" }]}>{title}</Text>
    </TouchableOpacity>
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
    fontSize: 16,
  },
});
