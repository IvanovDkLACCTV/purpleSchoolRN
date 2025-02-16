import { Colors } from "../shared/tokens"
export const Theme = {
  light: {
    background: Colors.backgroundColorLight,
    drawerBackground: Colors.drawerBackgroundLight,
    text: Colors.textColorLight,
    tint: Colors.accentColorLight,
    headerText: Colors.headerTextColorLight,
    inputBackground: Colors.inputBackgroundColorLight,
    phText: Colors.phTextLight,
    hover: Colors.preHover,
    preHover: Colors.accentColorLight,
    lighter: Colors.preHover,
    error: Colors.tomato,
    border: Colors.borderLight,
  },
  dark: {
    background: Colors.black,
    drawerBackground: Colors.drawerBackgroundDark,
    text: Colors.textColorDark,
    tint: Colors.primary,
    headerText: Colors.headerTextColorDark,
    inputBackground: Colors.violetDark,
    phText: Colors.gray,
    hover: Colors.primaryHover,
    preHover: Colors.primary,
    lighter: Colors.inputBackgroundColorDark,
    error: Colors.red,
    gradientDarkPurple: Colors.gradientDarkPurple,
    border: Colors.borderDark,
  },
}
