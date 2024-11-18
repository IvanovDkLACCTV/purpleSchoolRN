import { Stack, Link } from "expo-router";
import { View, Text } from "react-native";
import { useState } from "react";

import { Theme } from "../constants/Colors";

export default function Restore() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? Theme.dark : Theme.light;
    return (
    <View>
      <Stack.Screen options={{ title: "Restore password", statusBarColor: theme.background }} />
      <Link href={"/"}>
        <Text>Restore</Text>
      </Link>
    </View>)
}