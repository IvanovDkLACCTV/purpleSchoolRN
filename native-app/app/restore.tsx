import { Stack, Link } from "expo-router";
import { View, Text } from "react-native";

export default function Restore() {
    return (
    <View>
      <Stack.Screen options={{ title: "Restore" }} />
      <Link href={"/"}>
        <Text>Restore</Text>
      </Link>
    </View>)
}