import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useTheme } from '@react-navigation/native';
import { colors, styles } from '../../../../styles';
import {
  Button,
  ICountAssets,
  IEmptySelectedAssets,
  IHasSelection,
  ScreenHeaderTheme,
  Section,
  ThemeText,
} from '../../../components';

type HeaderType = IHasSelection &
  ICountAssets &
  IEmptySelectedAssets & {
    albumName: string;
  };
export const Header: React.FC<HeaderType> = ({
  albumName,
  hasSelection,
  countAssets,
  emptySelectedAssets,
}): JSX.Element => {
  const { goBack } = useNavigation();
  const {
    colors: { text },
  } = useTheme();
  return (
    <ScreenHeaderTheme style={[styles.flexCenter, styles.padding_sm]}>
      <Section
        style={[styles.row, styles.alignItems_center, styles.justifyContent_between]}
      >
        <View
          style={[
            {
              flex: 5,
            },
          ]}
        >
          {hasSelection ? (
            <View style={[styles.row, styles.alignItems_center]}>
              <Button
                onPress={goBack}
                style={[styles.marginRight_sm, styles.buttonIcon]}
              >
                <Icon name="keyboard-arrow-left" size={30} color={text} />
              </Button>
              <ThemeText style={[styles.font_lg, styles.fontWeight_700]}>
                {albumName}
              </ThemeText>
            </View>
          ) : (
            <View
              style={[
                styles.row,
                styles.alignItems_center,
                styles.justifyContent_between,
              ]}
            >
              <View style={[styles.row, styles.alignItems_center]}>
                <Button
                  onPress={emptySelectedAssets}
                  style={[styles.marginRight_md]}
                >
                  <FontAwesome name="times" size={20} />
                </Button>
                <Text
                  style={[
                    {
                      color: text,
                    },
                    styles.font_lg,
                  ]}
                >
                  {countAssets()}
                </Text>
              </View>
              <View style={[styles.row, styles.alignItems_center]}>
                <Button style={[styles.marginRight_md, styles.buttonIcon]}>
                  <Icon name="share" size={20} color={text} />
                </Button>
                <Button style={[styles.buttonIcon]}>
                  <Ionicon name="trash-outline" size={20} color={text} />
                </Button>
              </View>
            </View>
          )}
        </View>
        <View
          style={[
            {
              flex: 1,
            },
            styles.alignItems_end,
          ]}
        >
          <Button style={[styles.buttonIcon]}>
            <Ionicon name="ellipsis-vertical" color={text} size={20} />
          </Button>
        </View>
      </Section>
    </ScreenHeaderTheme>
  );
};
