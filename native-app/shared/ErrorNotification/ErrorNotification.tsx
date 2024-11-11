import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";

import { ErrorNotificationProps } from "./ErrorNotification.props";
import { Theme } from "../../constants/Colors";
import { Fonts } from "../../constants/Fonts";
import { FontSize } from "../tokens";
import { Width } from "../../constants/Sizes";

export const ErrorNotification = ({
  isDarkMode = false,
  error,
}: ErrorNotificationProps) => {
  const [isError, setIsError] = useState<boolean>(false);
  const theme = isDarkMode ? Theme.dark : Theme.light;

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  const styles = StyleSheet.create({
    error: {
      zIndex: 1,
      position: "absolute",
      width: Width,
      backgroundColor: theme.error,
      padding: 15,
    },
    errorText: {
      color: theme.text,
      fontSize: FontSize.f16,
      fontFamily: "Poppins_400Regular",
      textAlign: "center",
    },
  });

  useEffect(() => {
    if (!error) {
      return;
    }
    setIsError(true);
    const timer = setTimeout(() => setIsError(false), 3000);
    return () => clearTimeout(timer);
  }, [error]);

  if (!isError) {
    return <></>;
  }

  return (
    <View style={styles.error}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
};
