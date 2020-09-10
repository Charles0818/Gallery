import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
// import { PaddingProps } from './interfaces'
export const colors = {
  dark: '#121212',
  dark_opacity: 'rgba(0, 0, 0, 0.648)',
  gray_color2: '#302f2fc2',
  opacity_white: '#d8cfcf75',
  white: '#fff',
  white2: '#fcfbfa',
  danger: '#df0202',
  danger_opacity: '#df02024f',
  green: '#22dd09',
  color1: '#FC1E19',
  color1_opacity: 'rgba(252, 29, 25, 0.164)',
  color2: '#FBB288',
  color2_opacity: 'rgba(214, 57, 9, 0.801)',
  color3: '#670305',
  color3_opacity: '#67030528',
  facebook: 'rgb(59, 89, 152)',
  facebook_opacity: 'rgba(59, 89, 152, .3)',
  google_red: 'rgb(219, 68, 55)',
  google_red_opacity: 'rgba(219, 68, 55, .3)',
  google_yellow: 'rgb(244, 180, 0)',
  google_yellow_opacity: 'rgba(244, 180, 0, .3)',
  google_green: 'rgb(15, 157, 88)',
  google_green_opacity: 'rgba(15, 157, 88, .3)',
  gray_color: '#a0a0a0',
};

const font = {
  font_xlg: {
    fontSize: 32,
  },
  font_xxlg: {
    fontSize: 40,
  },

  font_lg: {
    fontSize: 20,
  },

  font_md: {
    fontSize: 16,
  },

  font_sm: {
    fontSize: 13.6,
  },

  font_xsm: {
    fontSize: 12,
  },

  fontWeight_700: {
    fontWeight: '700',
  },
  fontWeight_bold: {
    fontWeight: 'bold',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  text_center: {
    textAlign: 'center',
  },
  text: {
    lineHeight: 22,
  },
  heading: {
    letterSpacing: 2,
    fontWeight: '700',
  },
};

const margin = {
  margin_sm: {
    marginHorizontal: 5,
    marginVertical: 4,
  },
  margin_md: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  marginVertical_md: {
    marginVertical: 10,
  },
  margin_xsm: {
    margin: 4,
  },
  margin_lg: {
    marginHorizontal: 40,
    marginVertical: 50,
  },
  marginBottom_sm: {
    marginBottom: 10,
  },
  marginBottom_xsm: {
    marginBottom: 5,
  },
  marginBottom_md: {
    marginBottom: 30,
  },
  marginBottom_lg: {
    marginBottom: 50,
  },
  marginTop_xsm: {
    marginTop: 5,
  },
  marginTop_sm: {
    marginTop: 10,
  },
  marginTop_lg: {
    marginTop: 50,
  },
  marginTop_md: {
    marginTop: 30,
  },
  marginLeft_xsm: {
    marginLeft: 5,
  },
  marginLeft_sm: {
    marginLeft: 10,
  },
  marginLeft_md: {
    marginLeft: 30,
  },
  marginLeft_lg: {
    marginLeft: 50,
  },
  marginRight_xsm: {
    marginRight: 5,
  },
  marginRight_sm: {
    marginRight: 10,
  },
  marginRight_md: {
    marginRight: 30,
  },
  marginRight_lg: {
    marginRight: 50,
  },
};

const padding = {
  padding_sm: {
    paddingHorizontal: 5,
    paddingVertical: 4,
  },
  padding_md: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  padding_xsm: {
    padding: 4,
  },
  padding_lg: {
    paddingHorizontal: 40,
    paddingVertical: 50,
  },
  paddingBottom_sm: {
    paddingBottom: 10,
  },
  paddingBottom_xsm: {
    paddingBottom: 5,
  },
  paddingBottom_md: {
    paddingBottom: 30,
  },
  paddingBottom_lg: {
    paddingBottom: 50,
  },
  paddingTop_xsm: {
    paddingTop: 5,
  },
  paddingTop_sm: {
    paddingTop: 10,
  },
  paddingTop_lg: {
    paddingTop: 50,
  },
  paddingTop_md: {
    paddingTop: 30,
  },
  paddingLeft_xsm: {
    paddingLeft: 5,
  },
  paddingLeft_sm: {
    paddingLeft: 10,
  },
  paddingLeft_md: {
    paddingLeft: 30,
  },
  paddingLeft_lg: {
    paddingLeft: 50,
  },
  paddingRight_xsm: {
    paddingRight: 5,
  },
  paddingRight_sm: {
    paddingRight: 10,
  },
  paddingRight_md: {
    paddingRight: 30,
  },
  paddingRight_lg: {
    paddingRight: 50,
  },
  paddingHorizontal_sm: {
    paddingHorizontal: 10,
  },
  paddingHorizontal_md: {
    paddingHorizontal: 30,
  },
  paddingVertical_sm: {
    paddingVertical: 10,
  },
  paddingVertical_md: {
    paddingVertical: 30,
  },
};

const flex = {
  row: {
    flexDirection: 'row',
  },
  alignItems_center: {
    alignItems: 'center',
  },
  alignItems_end: {
    alignItems: 'flex-end',
  },
  justifyContent_center: {
    justifyContent: 'center',
  },
  justifyContent_between: {
    justifyContent: 'space-between',
  },
  justifyContent_end: {
    justifyContent: 'flex-end',
  },
  nowrap: {
    flexWrap: 'nowrap',
  },
  wrap: {
    flexWrap: 'wrap',
  },
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexEnd: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  absoluteOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
};

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  color_white: {
    color: colors.white,
  },
  color1: {
    color: colors.color1,
  },
  color2: {
    color: colors.color2,
  },
  color3: {
    color: colors.color3,
  },
  color_gray: {
    color: colors.gray_color,
  },
  color_gray2: {
    color: colors.gray_color2,
  },
  color_dark: {
    color: colors.dark,
  },
  color_danger: {
    color: colors.danger,
  },
  bg_white: {
    backgroundColor: colors.white,
  },
  bg_white2: {
    backgroundColor: colors.white2,
  },
  bg_whiteOpacity: {
    backgroundColor: colors.opacity_white,
  },
  bg_dark: {
    backgroundColor: colors.dark,
  },
  bg_darkOpacity: {
    backgroundColor: colors.dark_opacity,
  },
  bg_color1: {
    backgroundColor: colors.color1,
  },
  bg_color1Opacity: {
    backgroundColor: colors.color1_opacity,
  },
  bg_color2: {
    backgroundColor: colors.color2,
  },
  bg_color3: {
    backgroundColor: colors.color3,
  },
  bg_gray: {
    backgroundColor: colors.gray_color2,
  },
  bg_danger: {
    backgroundColor: colors.danger,
  },
  overflow_h: {
    overflow: 'hidden',
  },
  ...padding,
  ...margin,
  ...flex,
  ...font,
  position_relative: {
    position: 'relative',
  },
  position_absolute: {
    position: 'absolute',
  },
  border_r_5: {
    borderRadius: 5,
  },
  border_r_10: {
    borderRadius: 10,
  },
  border_r_35: {
    borderRadius: 35,
  },
  borderLeft: {
    borderLeftWidth: 1,
    borderLeftColor: colors.gray_color2,
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: colors.gray_color2,
  },
  borderPoint_right: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  borderPoint_left: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  slimDottedBorder: {
    borderStyle: 'dashed',
    borderBottomWidth: 1,
    borderRadius: 1,
    borderColor: colors.opacity_white,
  },
  slimBorder: {
    borderWidth: 1,
    borderColor: colors.opacity_white,
  },
  slimBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.opacity_white,
  },
  slimBorderTop: {
    borderTopWidth: 1,
    borderTopColor: colors.opacity_white,
  },
  boxShadowDark_sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  boxShadowGray_sm: {
    shadowColor: colors.gray_color2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  boxShadow_md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  boxShadow_lg: {
    shadowColor: colors.gray_color2,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  buttonIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    ...flex.flexCenter,
  },
});
