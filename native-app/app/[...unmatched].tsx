import { Image, StyleSheet, Text, View, Switch } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../constants/Colors';
import { FontSize, Gaps } from '../shared/tokens';
import { useTheme } from '../shared/ThemeContext';

export default function UnmatchedCustom() {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const theme = isDarkMode ? Theme.dark : Theme.light;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={require('../assets/images/unmatched.png')}
          resizeMode="contain"
        />
        <Text style={[styles.text, { color: theme.text }]}>Wow, dude... Something went wrong. Try to get back to homepage</Text>
        <Link
          href="/"
          style={styles.link}>
          <Text style={[styles.linkText, { color: theme.tint }]}>Homepage</Text>
        </Link>
      </View>
      <Switch
        style={styles.themeSwitch}
        value={isDarkMode}
        onValueChange={setIsDarkMode}
        thumbColor={theme.tint}
        trackColor={{ false: theme.lighter, true: theme.lighter }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 55,
  },
  content: {
    alignItems: 'center',
    gap: Gaps.g50,
  },
  image: {
    width: 204,
    height: 282,
  },
  text: {
    fontSize: FontSize.f18,
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  link: {
    padding: 16,
  },
  linkText: {
    fontSize: FontSize.f18,
    fontFamily: 'Poppins',
  },
  themeSwitch: {
    position: 'absolute',
    bottom: 60,
    right: 20,
  },
});
