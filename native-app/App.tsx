import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>Text element</Text>
        <Button title="button" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
  },
  wrapper: {
    backgroundColor: "lightblue",
    flexDirection: "row",
  },
  text: {
    color: "red",
    fontSize: 30,
    paddingHorizontal: 20,
  },
});
