import { Redirect } from "expo-router"
import { useAtomValue } from "jotai"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Drawer } from "expo-router/drawer"
import { Text } from "react-native"

import { authAtom } from "../../entities/auth/model/auth.state"
import { useTheme } from "../../shared/ThemeContext"
import { Theme } from "../../constants/Colors"
import { FontSize } from "../../shared/tokens"

export default function AppLayout() {
  const { access_token } = useAtomValue(authAtom)
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light

  if (!access_token) {
    return <Redirect href="/login" />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: theme.lighter,
            shadowColor: "transparent",
            shadowOpacity: 0,
          },
          headerLeft: () => {
            return <Text>Open/Close</Text>
          },
          headerTintColor: theme.text,
          headerTitleStyle: {
            fontFamily: "Poppins",
            color: theme.text,
            fontSize: FontSize.f20,
          },
          headerTitleAlign: "center",
          sceneContainerStyle: {
            backgroundColor: theme.background,
          },
        })}
      >
        <Drawer.Screen name="index" options={{ title: "My Courses" }} />
      </Drawer>
    </GestureHandlerRootView>
  )
}
