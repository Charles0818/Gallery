import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../../../styles';

export const EmptyListRender = ({ text }: { text: string }): JSX.Element => {
  return (
    <View style={[styles.flexCenter]}>
      <Text>{text}</Text>
    </View>
  );
};
