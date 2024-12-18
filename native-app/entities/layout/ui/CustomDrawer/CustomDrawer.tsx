import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer"
import { StyleSheet, Text, View, Image } from "react-native"
import { useAtom, useSetAtom } from "jotai"
import { useEffect } from "react"

import { useTheme } from "../../../../shared/ThemeContext"
import { Theme } from "../../../../constants/Colors"
import { CloseDrawer } from "../../../../features/layout/ui/CloseDrawer/CloseDrawer"
import { CustomLink } from "../../../../shared/CustomLink/CustomLink"
import { logoutAtom } from "../../../auth/model/auth.state"
import { loadProfileAtom } from "../../../user/model/user.state"
import { UserMenu } from "../../../user/ui/UserMenu/UserMenu"
import CoursesIcon from "../../../../assets/menu/courses"
import ProfileIcon from "../../../../assets/menu/profile"
import { MenuItem } from "../MenuItem/MenuItem"

const MENU = [
  {
    text: "Courses",
    icon: <CoursesIcon />,
    path: "/(app)",
  },
  {
    text: "Profile",
    icon: <ProfileIcon />,
    path: "/profile",
  },
]

export function CustomDrawer(props: DrawerContentComponentProps) {
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light
  const logout = useSetAtom(logoutAtom)
  const [profile, loadProfile] = useAtom(loadProfileAtom)

  useEffect(() => {
    loadProfile()
  }, [])

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
      marginBottom: 20,
    },
  })

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.scrollView}
    >
      <CloseDrawer {...props.navigation} />
      <View style={styles.content}>
        <UserMenu user={profile.profile} />
        {MENU.map((menu) => (
          <MenuItem key={menu.path} {...menu} navigation={props.navigation} />
        ))}
      </View>

      <View>
        <View style={styles.footer}>
          <Image
            source={require("../../../../assets/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomLink
              text="Logout"
              href={"/login"}
              onPress={() => logout()}
            />
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
