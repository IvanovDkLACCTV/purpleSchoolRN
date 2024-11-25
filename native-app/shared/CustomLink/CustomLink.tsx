import { Link } from "expo-router";
import { Text, StyleSheet } from "react-native";



export const CustomLink = (props) => {
      
    return (
      <Link {...props}>
        <Text>{props.children}</Text>
      </Link>
    );
  };

  const styles = StyleSheet.create({});