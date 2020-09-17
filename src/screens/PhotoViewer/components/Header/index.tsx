import React, { useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import { styles } from '../../../../styles';
import { Button, ScreenHeaderTheme, Section, ThemeText } from '../../../components';

type PhotoHeaderProps = {
  filename: string | null;
};
export const Header: React.FC<PhotoHeaderProps> = ({ filename }): JSX.Element => {
  const {
    colors: { text },
  } = useTheme();
  const fadeIn = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(fadeIn, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <ScreenHeaderTheme
      style={[
        styles.padding_sm,
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          opacity: fadeIn,
          transform: [
            {
              translateY: fadeIn.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0],
              }),
            },
            { perspective: 1000 },
          ],
        },
      ]}>
      <Section
        style={[
          styles.row,
          styles.flexCenter,
          styles.alignItems_center,
          styles.justifyContent_between,
        ]}>
        <View style={[{ flex: 5 }]}>
          <ThemeText numberOfLines={1}>{filename}</ThemeText>
        </View>
        <View style={[{ flex: 1 }, styles.alignItems_end]}>
          <Button style={[styles.buttonIcon]}>
            <Ionicon name="ellipsis-vertical" color={text} size={20} />
          </Button>
        </View>
      </Section>
    </ScreenHeaderTheme>
  );
};
