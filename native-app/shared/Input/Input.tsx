import {
  TextInput,
  StyleSheet,
  TextInputProps,
  Pressable,
  View,
} from "react-native";
import React, { useState } from "react";
import { Theme } from "../../constants/Colors";
import { Radius } from "../tokens";
import EyeClosedIcon from "../../assets/icons/eye-closed";
import EyeOpenedIcon from "../../assets/icons/eye-opened";

interface InputProps {
  isDarkMode: boolean;
  isPassword?: boolean;
}

export const Input = (props: TextInputProps & { isPassword?: boolean }) => {
  const [isDarkMode] = useState<boolean>(false);
  const theme = isDarkMode ? Theme.dark : Theme.light;
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <View>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.inputBackground,
            color: theme.text,
          },
        ]}
        placeholderTextColor={theme.phText}
        secureTextEntry={props.isPassword && !isPasswordVisible}
        {...props}
      />
      {props.isPassword && (
        <Pressable
          style={styles.eyeIcon}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? <EyeOpenedIcon /> : <EyeClosedIcon />}
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: Radius.r20,
    paddingLeft: 24,
    paddingRight: 16,
    paddingVertical: 12,
    fontSize: 14,
    height: 50,
    fontFamily: "Poppins_400Regular",
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
    top: 12,
  },
});
