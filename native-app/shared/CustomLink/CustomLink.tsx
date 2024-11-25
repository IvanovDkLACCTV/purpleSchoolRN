import { Link } from "expo-router";
import { Text, StyleSheet } from "react-native";
import {LinkProps} from 'expo-router/build/link/Link'

import { FontSize } from "../tokens";
import { Theme } from "../../constants/Colors";
import { useTheme } from "../ThemeContext";

type CustomLinkProps = LinkProps & {
  text: string;
  fontSize?: number;
}

export const CustomLink = ({text, fontSize = FontSize.f18, ...props}: CustomLinkProps) => {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? Theme.dark : Theme.light;

  const styles = StyleSheet.create({
    link: {
      color: theme.tint,
      alignSelf: "center"
    },
    text: {
      fontSize: fontSize,
      fontFamily: "Poppins",
    },
  });
 
    return (
      <Link {...props} style={styles.link}>
        <Text style={styles.text}>{text}</Text>
      </Link>
    );
  };