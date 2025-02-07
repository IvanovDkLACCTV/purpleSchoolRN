import { Redirect } from "expo-router"
import { useAtomValue } from "jotai"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Drawer } from "expo-router/drawer"
import { useState } from "react"
import * as Notifications from "expo-notifications"

import { authAtom } from "../../entities/auth/model/auth.state"
import { useTheme } from "../../shared/ThemeSwitch/ThemeContext"
import { Theme } from "../../constants/Colors"
import { FontSize } from "../../shared/tokens"
import { MenuButton } from "../../features/layout/ui/MenuButton/MenuButton"
import { CustomDrawer } from "../../widget/layout/ui/CustomDrawer/CustomDrawer"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

export default function AppLayout() {
  const { access_token } = useAtomValue(authAtom)
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light
  const [image, setImage] = useState<string | null>(null)

  if (!access_token) {
    return <Redirect href="/login" />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawer {...props} image={image} />}
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: theme.lighter,
            shadowColor: "transparent",
            shadowOpacity: 0,
          },
          headerLeft: () => {
            return <MenuButton navigation={navigation} />
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
        <Drawer.Screen name="profile" options={{ title: "Profile" }} />
      </Drawer>
    </GestureHandlerRootView>
  )
}
