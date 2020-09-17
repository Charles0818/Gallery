import React, { useRef, useEffect } from 'react';
import { Animated, ViewStyle, ViewProps } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { styles } from '../../../styles';

export const EllipsisMenu: React.FC<ViewProps> = ({
  children,
  style,
}): JSX.Element => {
  const {
    colors: { card },
  } = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(opacity, {
      toValue: 1,
      velocity: 1,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <Animated.View
      style={[
        styles.border_r_5,
        {
          opacity,
          transform: [
            {
              scale: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ],
          backgroundColor: card,
          zIndex: 2,
          position: 'absolute',
          right: 5,
          top: 5,
        },
        style,
      ]}>
      {children}
    </Animated.View>
  );
};
