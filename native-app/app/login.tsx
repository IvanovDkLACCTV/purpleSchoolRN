//outer imports
import { useEffect, useState } from "react"
import { StyleSheet, Text, View, Image, Switch } from "react-native"
import { router } from "expo-router"
import { useAtom } from "jotai"
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins"

//inner imports
import { Theme } from "../constants/Colors"
import { Width } from "../constants/Sizes"
import { Input } from "../shared/Input/Input"
import { Gaps, FontSize } from "../shared/tokens"
import { Button } from "../shared/Button/Button"
import { ErrorNotification } from "../shared/ErrorNotification/ErrorNotification"
import { useTheme } from "../shared/ThemeContext"
import { CustomLink } from "../shared/CustomLink/CustomLink"
import { loginAtom } from "../entities/auth/model/auth.state"

export default function Login() {
  const { isDarkMode, setIsDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light

  const [error, setError] = useState<string | undefined>()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [{ access_token, isLoading, error: loginError }, login] =
    useAtom(loginAtom)

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  })

  const submit = async () => {
    if (!email) {
      setError("Email is required")
      return
    }

    if (!password) {
      setError("Password is required")
      return
    }

    login({ email, password })
  }

  useEffect(() => {
    if (loginError) {
      setError(loginError)
    }
  }, [loginError])

  useEffect(() => {
    if (access_token) {
      router.replace("/(app)")
    }
  }, [access_token])

  // Ensure that the component does not render until fonts are loaded
  if (!fontsLoaded) {
    return null // This is fine as long as it doesn't skip any hooks
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.top}>
        <ErrorNotification
          error={error}
          isDarkMode={isDarkMode}
          onDismiss={() => setError(undefined)}
        />
        <Image
          source={
            isDarkMode
              ? require("../assets/shapeDark.png")
              : require("../assets/shapeLight.png")
          }
          style={{
            resizeMode: "contain",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </View>
      <View style={styles.content}>
        <Text
          style={[
            styles.textStyle,
            { color: theme.headerText, fontWeight: "bold" },
          ]}
        >
          Welcome back
        </Text>
        <View style={styles.form}>
          <Input
            placeholder="Enter your email"
            autoCapitalize="none"
            keyboardType="email-address"
            isDarkMode={isDarkMode}
            onChangeText={setEmail}
          />
          <Input
            placeholder="Enter your password"
            isPassword={true}
            autoCapitalize="none"
            isDarkMode={isDarkMode}
            onChangeText={setPassword}
          />
          <CustomLink
            href="/course/typescript"
            text="Forgot your password?"
            fontSize={14}
          />
          <Button title="Login" isDarkMode={isDarkMode} onPress={submit} />
        </View>

        <View style={styles.signupContainer}>
          <Text style={[styles.text, { color: theme.text }]}>
            Don't have an account?
          </Text>
          <CustomLink href="/signup" text="Sign up" />
        </View>
      </View>
      <View style={styles.bottom}>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          thumbColor={theme.tint}
          trackColor={{ false: theme.lighter, true: theme.lighter }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.light.background,
    justifyContent: "center",
    flex: 1,
    width: Width,
    padding: Width * 0.1,
    paddingTop: 0,
  },
  top: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: Width * 0.5,
  },
  content: {
    alignItems: "center",
    gap: Gaps.g50,
    marginTop: Width * 0.2,
  },
  textStyle: {
    fontFamily: "Poppins_400Regular",
    color: Theme.light.text,
    fontSize: FontSize.f24,
  },
  form: {
    alignSelf: "stretch",
    gap: Gaps.g16,
  },
  bottom: {
    position: "absolute",
    bottom: Width * 0.1,
    right: Width * 0.1,
    zIndex: 1,
  },
  signupContainer: {
    flexDirection: "row",
    gap: Gaps.g8,
    alignSelf: "center",
    alignItems: "center",
    marginTop: Gaps.g8,
  },
  text: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
})
