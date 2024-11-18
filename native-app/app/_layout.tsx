import { Slot, Stack, Tabs } from "expo-router";
import { useState } from "react";
import { Theme } from "../constants/Colors";

export default function RootLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? Theme.dark : Theme.light;
  return( 
    <Stack screenOptions={{ 
      headerShown: false, 
      statusBarColor: theme.background,
      statusBarStyle: isDarkMode ? 'light' : 'dark'
     }}> 
    <Stack.Screen name="index" options={{ headerShown: false, statusBarColor: theme.background, statusBarStyle: isDarkMode ? 'light' : 'dark' }} />
    <Stack.Screen name="restore" options={{ headerShown: false, presentation: 'modal', statusBarColor: theme.background, statusBarStyle: isDarkMode ? 'light' : 'dark'  }} />
  </Stack>)
}
