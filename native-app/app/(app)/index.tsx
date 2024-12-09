import { useAtom, useSetAtom } from "jotai"
import { Text, View } from "react-native"
import { loginAtom, logoutAtom } from "../../entities/auth/model/auth.state"
import { useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function MyCourses() {
  const [auth, login] = useAtom(loginAtom)
  const logout = useSetAtom(logoutAtom)

  useEffect(() => {
    login({ email: "john.doe@example.com", password: "password123" })
  }, [])

  useEffect(() => {
    console.log(auth)
  }, [auth])

  useEffect(() => {
    return () => {
      logout()
      AsyncStorage.getItem("auth").then((value) => console.log(value))
    }
  }, [])

  return (
    <View>
      <Text></Text>
    </View>
  )
}
