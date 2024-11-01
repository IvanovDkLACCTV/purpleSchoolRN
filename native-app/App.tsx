//outer exports
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TextInput,
} from "react-native";
//inner exports
import { Colors } from "./constants/Colors";
import { width } from "./constants/Sizes";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.textStyle}>Welcome back, dude</Text>
        <View style={styles.form}>
          <TextInput style={styles.input} />
          <TextInput style={styles.input} />
          <Button title="Enter" />
        </View>
        <Text style={styles.textStyle}>Reset your password</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    padding: 55,
  },
  content: {
    alignItems: "center",
    gap: 50,
  },
  textStyle: {
    color: Colors.light.tint,
    fontSize: 24,
  },
  form: {
    alignSelf: "stretch",
    gap: 16,
  },
  input: {
    backgroundColor: Colors.light.background,
    color: Colors.light.text,
  },
});
