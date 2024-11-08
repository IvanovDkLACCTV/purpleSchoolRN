//outer imports
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Image,
  Switch,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
//inner imports
import { Theme } from "./constants/Colors"; // Changed from Colors to Theme
import { Width } from "./constants/Sizes";
import { Fonts } from "./constants/Fonts";
import { Input } from "./shared/Input/Input";
import { Gaps, Radius, FontSize } from "./shared/tokens";
import { Button } from "./shared/Button/Button";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? Theme.dark : Theme.light; // Changed from Colors to Theme

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.top}>
        <Image
          source={
            isDarkMode
              ? require("./assets/shapeDark.png")
              : require("./assets/shapeLight.png")
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
          <Text
            style={[
              styles.textStyle,
              { color: theme.tint, fontSize: 13, alignSelf: "center" },
            ]}
          >
            Forget password?
          </Text>
          <Button title="Login" isDarkMode={isDarkMode} onPress={() => {}} />
        </View>

        <View style={styles.signupContainer}>
          <Text style={[styles.text, { color: theme.text }]}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={[styles.text, { color: theme.tint }]}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottom}>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          thumbColor={isDarkMode ? Theme.dark.tint : Theme.light.tint}
          trackColor={{ false: Theme.dark.tint, true: Theme.light.tint }}
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
