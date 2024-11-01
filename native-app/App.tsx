//outer imports
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TextInput,
} from "react-native";
//inner imports
import { Colors } from "./constants/Colors";
import { Width } from "./constants/Sizes";
import { Fonts } from "./constants/Fonts";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text
          style={[
            styles.textStyle,
            { color: Colors.light.headerText, fontWeight: "bold" },
          ]}
        >
          Welcome back
        </Text>
        <View style={styles.form}>
          <TextInput style={styles.input} />
          <TextInput style={styles.input} />
          <Text
            style={[
              styles.textStyle,
              { color: Colors.light.tint, fontSize: 16, alignSelf: "center" },
            ]}
          >
            Forget password?
          </Text>
          <Button title="Login" color={Colors.light.tint} />
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              alignSelf: "center",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <Text>Don't have an account?</Text>
            <Text style={{ color: Colors.light.tint }}>Sign up</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    flex: 1,
    padding: 55,
  },
  content: {
    alignItems: "center",
    gap: 50,
  },
  textStyle: {
    color: Colors.light.text,
    fontSize: 24,
  },
  form: {
    alignSelf: "stretch",
    gap: 16,
  },
  input: {
    backgroundColor: Colors.light.inputBackground,
    color: Colors.light.text,
  },
});
