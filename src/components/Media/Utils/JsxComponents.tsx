import React from 'react';
import {
  Animated,
  Text,
  TextProps,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme as useAppTheme } from '@react-navigation/native';
import { colors, styles } from '../../../styles';
import { AppState, types } from '../../../helpers';

const { themeValues } = types;
type ThemeTextType = TextProps & {
  style?: any[] | TextStyle;
  children: React.ReactNode;
};

type ScreenHeaderThemeType = ViewProps & {
  style?: ViewStyle[];
  children: React.ReactNode;
};
export const useTheme = (): types.themeValues => {
  const theme: types.themeValues = useSelector(
    (state: AppState) => state.settings.theme,
  );
  return theme;
};

export const useThemeColor = (): string => {
  const theme: types.themeValues = useSelector(
    (state: AppState) => state.settings.theme,
  );
  const color = theme === themeValues.light ? colors.dark : colors.white;
  return color;
};

export const ThemeText: React.FC<ThemeTextType> = ({
  style,
  children,
  ...rest
}): JSX.Element => {
  const {
    colors: { text },
  } = useAppTheme();
  return (
    <Text
      style={[
        {
          color: text,
        },
        style,
      ]}
      {...rest}>
      {children}
    </Text>
  );
};

export const GrayText = ({
  style,
  children,
  ...rest
}: ThemeTextType): JSX.Element => (
  <Text style={[styles.color_gray, style]} {...rest}>
    {children}
  </Text>
);

export const ScreenHeaderTheme: React.FC<ScreenHeaderThemeType> = ({
  children,
  style,
}): JSX.Element => {
  const {
    colors: { card, border },
  } = useAppTheme();
  return (
    <Animated.View
      style={[
        {
          backgroundColor: card,
        },
        style,
      ]}>
      {children}
    </Animated.View>
  );
};
