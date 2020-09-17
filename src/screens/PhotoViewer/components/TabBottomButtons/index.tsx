import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../../../../styles';
import { Button, ThemeText } from '../../../components';
import { useTheme } from '@react-navigation/native';

export const TabBottomButtons = () => {
  const {
    colors: { text },
  } = useTheme();
  const fadeIn = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(fadeIn, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    return () => fadeIn.flattenOffset();
  }, []);
  return (
    <Animated.View
      style={[
        styles.row,
        styles.bg_darkOpacity,
        {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
          opacity: fadeIn,
          transform: [
            {
              translateY: fadeIn.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0],
              }),
            },
            { perspective: 1000 },
          ],
        },
      ]}>
      <Button
        style={[
          { flex: 1, borderRadius: 25 },
          styles.padding_md,
          styles.flexCenter,
        ]}>
        <Ionicon name="share-social" color={text} size={20} />
        <ThemeText style={[styles.font_xsm]}>Share</ThemeText>
      </Button>
      <Button
        style={[
          { flex: 1, borderRadius: 25 },
          styles.padding_md,
          styles.flexCenter,
        ]}>
        <MaterialCommunityIcon name="image-edit-outline" color={text} size={20} />
        <ThemeText style={[styles.font_xsm]}>Edit</ThemeText>
      </Button>
      <Button
        style={[
          { flex: 1, borderRadius: 25 },
          styles.padding_md,
          styles.flexCenter,
        ]}>
        <MaterialCommunityIcon name="delete" color={text} size={20} />
        <ThemeText style={[styles.font_xsm]}>Delete</ThemeText>
      </Button>
    </Animated.View>
  );
};
