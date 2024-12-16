import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer"
import { StyleSheet, Text, View, Image } from "react-native"

import { useTheme } from "../../../../shared/ThemeContext"
import { Theme } from "../../../../constants/Colors"
import { CloseDrawer } from "../../../../features/layout/ui/CloseDrawer/CloseDrawer"
import { CustomLink } from "../../../../shared/CustomLink/CustomLink"

export function CustomDrawer(props: DrawerContentComponentProps) {
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: theme.background,
    },
    logo: {
      width: 100,
      height: 100,
      marginRight: 100,
    },
    content: {
      flex: 1,
    },
    footer: {
      flexDirection: "row",
    },
  })

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.scrollView}
    >
      <CloseDrawer {...props.navigation} />
      <View style={styles.content}>
        <Text style={{ color: theme.text }}>Custom Drawer</Text>
      </View>
      <View>
        <View style={styles.footer}>
          <Image
            source={require("../../../../assets/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomLink text="Go back" href={"/login"} />
            <Text
              style={{
                fontSize: 32,
                marginLeft: -16,
                color: theme.tint,
              }}
            >
              {"\u2936"}
            </Text>
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  )
}
