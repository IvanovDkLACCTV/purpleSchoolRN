import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer'
import { StyleSheet, Text, View } from 'react-native'

import { useTheme } from '../../../../shared/ThemeContext'
import { Theme } from '../../../../constants/Colors'
import { CloseDrawer } from '../../../../features/layout/ui/CloseDrawer/CloseDrawer'

export function CustomDrawer(props: DrawerContentComponentProps) {
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? Theme.dark : Theme.light

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: theme.background,
    },
  })

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.scrollView}>
      <CloseDrawer {...props.navigation} />
      <View>
        <Text>Drawer</Text>
      </View>
    </DrawerContentScrollView>
  )
}
