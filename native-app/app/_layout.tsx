import { Stack, SplashScreen } from "expo-router"
import { Theme } from "../constants/Colors"
import { ThemeProvider, useTheme } from "../shared/ThemeSwitch/ThemeContext"
import { LinearGradient } from "expo-linear-gradient"
import { View, StatusBar } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { useFonts } from "expo-font"
import { useEffect } from "react"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  )
}

function RootLayoutContent() {
  const { isDarkMode } = useTheme()

  const gradientColors = isDarkMode
    ? ([
        Theme.dark.preHover,
        Theme.dark.gradientDarkPurple,
        Theme.dark.background,
        Theme.dark.background,
      ] as const)
    : ([
        Theme.light.lighter,
        Theme.light.lighter,
        Theme.light.background,
        Theme.light.background,
      ] as const)

  const locations = [0, 0.17, 0.55, 1] as const

  const [fontsLoaded, error] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={gradientColors}
          locations={locations}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: StatusBar.currentHeight || 0,
            zIndex: 1,
          }}
        />
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={isDarkMode ? "light-content" : "dark-content"}
        />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: isDarkMode
                ? Theme.dark.background
                : Theme.light.background,
            },
          }}
        >
          <Stack.Screen name="login" />
          <Stack.Screen
            name="restore"
            options={{ headerShown: false, presentation: "modal" }}
          />
        </Stack>
      </View>
    </SafeAreaProvider>
  )
}
