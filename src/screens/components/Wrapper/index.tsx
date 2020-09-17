import React from 'react';
import { SafeAreaView, View, ViewProps } from 'react-native';
import { styles } from '../../../styles';
import { types } from '../../../helpers';

export interface globalProp extends ViewProps {
  children: React.ReactNode;
  style?: object | any[];
}
export const Screen: React.FC<globalProp> = ({
  children,
  style,
  ...rest
}): JSX.Element => {
  return (
    <SafeAreaView style={[styles.screen, style || null]}>{children}</SafeAreaView>
  );
};

export const Section: React.FC<globalProp> = ({
  children,
  style,
  ...rest
}): JSX.Element => {
  return (
    <View
      {...rest}
      style={[styles.paddingHorizontal_sm, styles.marginBottom_md, style || null]}>
      {children}
    </View>
  );
};
