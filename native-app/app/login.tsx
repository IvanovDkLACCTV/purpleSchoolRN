//outer imports
import {
  StyleSheet,
  Text,
  View,
  Image,
  Switch,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Link } from "expo-router";

//inner imports
import { Theme } from "../constants/Colors";
import { Width } from "../constants/Sizes";
import { Input } from "../shared/Input/Input";
import { Gaps, FontSize } from "../shared/tokens";
import { Button } from "../shared/Button/Button";
import { ErrorNotification } from "../shared/ErrorNotification/ErrorNotification";
import { useTheme } from '../shared/ThemeContext';
import { CustomLink } from "../shared/CustomLink/CustomLink";

export default function Login() {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const theme = isDarkMode ? Theme.dark : Theme.light;

  const [error, setError] = useState<string | undefined>();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const alert = () => {
    setError("Login or password is incorrect");
    setTimeout(() => {
      setError(undefined);
    }, 4000);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.top}>
        <ErrorNotification
          error={error}
          isDarkMode={isDarkMode}
          onDismiss={alert}
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
          />
          <Input
            placeholder="Enter your password"
            isPassword={true}
            autoCapitalize="none"
            isDarkMode={isDarkMode}
          />
          <CustomLink href="/course/typescript" text="Forgot your password?" fontSize={14}/>
          <Button
            title="Login"
            isDarkMode={isDarkMode}
            onPress={() => {
              alert();
            }}
          />
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
  );
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
});