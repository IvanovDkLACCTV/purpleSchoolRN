import { Redirect, Stack } from "expo-router"
import { useAtomValue } from "jotai"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Drawer } from "expo-router/drawer"
import { authAtom } from "../../entities/auth/model/auth.state"

export default function AppLayout() {
  const { access_token } = useAtomValue(authAtom)
  if (!access_token) {
    return <Redirect href="/login" />
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen name="index" />
      </Drawer>
    </GestureHandlerRootView>
  )
}
