import { TextInput, StyleSheet, TextInputProps, Pressable } from "react-native";
import React, { useState } from "react";
import { Theme } from "../../constants/Colors";
import { Radius } from "../tokens";
import EyeClosedIcon from "../../assets/icons/eye-closed";
import EyeOpenedIcon from "../../assets/icons/eye-opened";

interface InputProps {
  isDarkMode: boolean;
  isPassword?: boolean;
}

export const Input = (props: TextInputProps & InputProps) => {
  const { isDarkMode, isPassword, ...restProps } = props;
  const theme = isDarkMode ? Theme.dark : Theme.light;
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(true);

  return (
    <>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.inputBackground,
            color: theme.text,
          },
        ]}
        placeholderTextColor={theme.phText}
        secureTextEntry={isPasswordVisible}
        {...restProps}
      />
      {props.isPassword && (
        <Pressable>
          {isPasswordVisible ? <EyeClosedIcon /> : <EyeOpenedIcon />}
        </Pressable>
      )}
    </>
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
});
