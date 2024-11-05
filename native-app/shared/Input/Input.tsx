import { TextInput, StyleSheet } from "react-native";
import { Theme } from "../../constants/Colors";

interface InputProps {
  isDarkMode: boolean;
}

export const Input = ({ isDarkMode }: InputProps) => {
  const theme = isDarkMode ? Theme.dark : Theme.light;

  return (
    <>
      <TextInput
        placeholder="Enter your email"
        placeholderTextColor={theme.phText}
        style={[
          styles.input,
          {
            backgroundColor: theme.inputBackground,
            color: theme.text,
            marginBottom: 10,
          },
        ]}
      />
      <TextInput
        placeholder="Enter your password"
        placeholderTextColor={theme.phText}
        style={[
          styles.input,
          {
            backgroundColor: theme.inputBackground,
            color: theme.text,
            marginTop: 10,
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 20,
    paddingLeft: 24,
    paddingRight: 16,
    paddingVertical: 12,
    fontSize: 14,
    height: 50,
    fontFamily: "Poppins_400Regular",
  },
});
