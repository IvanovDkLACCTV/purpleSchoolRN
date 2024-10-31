import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";

export default function App() {
  const width = Dimensions.get("window").width;
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>Text element</Text>
        <Button title="button" />
      </View>
      <View
        style={{
          backgroundColor: "lightblue",
          alignItems: "flex-end",
          height: 500,
          flexDirection: "row",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <View
          style={{
            backgroundColor: "tomato",
            width: width / 2 - 5,
            height: 100,
          }}
        >
          <Text>1</Text>
        </View>
        <View
          style={{
            backgroundColor: "purple",
            height: 100,
            width: width / 2 - 5,
          }}
        >
          <Text>2</Text>
        </View>
        <View
          style={{
            backgroundColor: "aquamarine",
            height: 100,
            width: width / 2 - 5,
          }}
        >
          <Text>3</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
  },
  wrapper: {
    backgroundColor: "lightgreen",
    flexDirection: "row",
  },
  text: {
    color: "red",
    fontSize: 30,
    paddingHorizontal: 20,
  },
});
