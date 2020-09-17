import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  ICountAssets,
  IEmptySelectedAlbums,
  IHasSelection,
  ScreenHeaderTheme,
  Section,
  ThemeText,
} from '../../../components';
import { colors, styles } from '../../../../styles';

import { useTheme } from '../../../../../node_modules/@react-navigation/native';

type HeaderType = IHasSelection & ICountAssets & IEmptySelectedAlbums;
const Header: React.FC<HeaderType> = ({
  hasSelection,
  countAssets,
  emptySelectedAlbums,
}): JSX.Element => {
  const {
    colors: { text },
  } = useTheme();
  return (
    <ScreenHeaderTheme
      style={[
        headerStyle.container,
        {
          height: 150,
        },
        styles.padding_sm,
      ]}>
      <Section
        style={[
          styles.row,
          styles.alignItems_center,
          styles.justifyContent_between,
          styles.marginTop_sm,
        ]}>
        <View
          style={[
            {
              flex: 5,
            },
          ]}>
          {!hasSelection ? (
            <View
              style={[
                styles.row,
                styles.alignItems_center,
                styles.justifyContent_between,
              ]}>
              <ThemeText style={[styles.font_xlg, styles.fontWeight_700]}>
                Albums
              </ThemeText>
              <Button onPress={(): void => {}}>
                <Icon name="search" size={20} color={text} />
              </Button>
            </View>
          ) : (
            <View style={[styles.row, styles.alignItems_center]}>
              <Button onPress={emptySelectedAlbums} style={[styles.marginRight_md]}>
                <Icon name="times" size={20} color={text} />
              </Button>
              <Text
                style={[
                  {
                    color: text,
                  },
                  styles.font_lg,
                ]}>
                {countAssets()}
              </Text>
            </View>
          )}
        </View>
        <View
          style={[
            {
              flex: 1,
            },
            styles.alignItems_end,
          ]}>
          <Button style={[styles.marginRight_xsm]}>
            <Icon name="ellipsis-v" size={20} color={colors.gray_color} />
          </Button>
        </View>
      </Section>
    </ScreenHeaderTheme>
  );
};

const headerStyle = StyleSheet.create({
  container: {
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
});
export default Header;
