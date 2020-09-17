import React from 'react';
import { View } from 'react-native';
import { styles } from '../../../../styles';
import { Header } from '../Header';
import { TabBottomButtons } from '../TabBottomButtons';
export const Overlay: React.FC = (): JSX.Element => {
  return (
    <View
      style={[
        {
          flex: 1,
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          zIndex: 1,
        },
        styles.justifyContent_between,
      ]}>
      <Header filename="filename" />
      <TabBottomButtons />
    </View>
  );
};
