import { TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

interface InputProps {
  isDarkMode: boolean;
}

export const Input = ({ isDarkMode }: InputProps) => {
  const theme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <>
      <TextInput
        placeholder="Enter your email"
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
    backgroundColor: Colors.light.inputBackground,
    color: Colors.light.text,
    borderRadius: 20,
    paddingLeft: 24,
    paddingRight: 16,
    paddingVertical: 12,
    fontSize: 14,
    height: 50,
    fontFamily: "Poppins_400Regular",
  },
});
