import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
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
          //justifyContent: "space-around",

          flexDirection: "row",
          flexWrap: "wrap-reverse",
          alignContent: "space-around",
        }}
      >
        <View style={{ backgroundColor: "tomato", width: "50%", height: 100 }}>
          <Text>Text</Text>
        </View>
        <View
          style={{
            backgroundColor: "purple",
            width: "50%",
            height: 100,
            //alignSelf: "stretch",
          }}
        ></View>
        <View
          style={{
            backgroundColor: "aquamarine",
            width: "50%",
            height: 100,
            //alignSelf: "center",
          }}
        ></View>
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
