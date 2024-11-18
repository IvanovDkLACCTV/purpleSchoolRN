import { Stack } from "expo-router";
import { Theme } from "../constants/Colors";
import { ThemeProvider, useTheme } from "../shared/ThemeContext";
import { LinearGradient } from 'expo-linear-gradient';
import { View, StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}

function RootLayoutContent() {
  const { isDarkMode } = useTheme();
  
  const gradientColors = isDarkMode 
    ? [Theme.dark.preHover, Theme.dark.preHover, Theme.dark.background, Theme.dark.background]
    : [Theme.light.lighter, Theme.light.lighter, Theme.light.background, Theme.light.background];

    const locations = [0, 0.15, 0.55, 1];

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={gradientColors}
        locations={locations}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: StatusBar.currentHeight || 0,
          zIndex: 1,
        }}
      />
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <Stack screenOptions={{ 
        headerShown: false,
        contentStyle: {
          backgroundColor: isDarkMode ? Theme.dark.background : Theme.light.background,
        },
      }}> 
        <Stack.Screen name="index" />
        <Stack.Screen name="restore" options={{ headerShown: false, presentation: 'modal' }} />
      </Stack>
    </View>
  );
}