import React, { memo } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Album, PhotoIdentifier } from '@react-native-community/cameraroll';
import { durationFormat, quantifier } from '../../../helpers';
import { Button } from '../../Button';
import { colors, styles } from '../../../styles';
import {
  IAddAlbum,
  IHasSelection,
  IRemoveAlbum,
  IsSelected,
  ThemeText,
} from '../../Media';

export type AlbumType = Album & {
  asset: PhotoIdentifier | null;
};
type AlbumCardType = IAddAlbum &
  IHasSelection &
  IRemoveAlbum &
  IsSelected & {
    album: AlbumType;
  };
export const AlbumCard: React.FC<AlbumCardType> = ({
  album,
  addAlbum,
  hasSelection,
  removeAlbum,
  isSelected,
}): JSX.Element => {
  const { navigate } = useNavigation();
  const {
    colors: { text, background },
  } = useTheme();
  const { count, title, asset } = album;
  const selected: boolean = isSelected(title);
  return (
    <View
      style={[
        mediumStyle.container,
        styles.marginBottom_xsm,
        styles.marginRight_xsm,
      ]}
    >
      <Button
        onPress={(): void =>
          hasSelection
            ? !selected
              ? addAlbum(album)
              : removeAlbum(title)
            : navigate('Album', {
                albumName: title,
              })
        }
        onLongPress={() => (selected ? removeAlbum(title) : addAlbum(album))}
      >
        <ImageBackground
          source={{
            uri: asset ? asset.node.image.uri : undefined,
          }}
          resizeMode="cover"
          style={[
            mediumStyle.thumbnail,
            styles.justifyContent_end,
            isSelected && styles.bg_darkOpacity,
          ]}
        >
          {asset && asset.node.image.playableDuration && (
            <View
              style={[
                styles.padding_sm,
                styles.bg_darkOpacity,
                styles.row,
                styles.justifyContent_between,
                styles.alignItems_center,
              ]}
            >
              <Icon
                name="play-circle"
                size={20}
                color={colors.white}
                style={[styles.marginRight_xsm]}
              />
              <Text
                numberOfLines={1}
                style={[styles.font_xsm, styles.color_white, styles.text]}
              >
                {durationFormat(asset.node.image.playableDuration)}
              </Text>
            </View>
          )}
          {hasSelection && (
            <View
              style={[
                mediumStyle.select,
                styles.flexCenter,
                selected && {
                  backgroundColor: text,
                },
              ]}
            >
              {selected && <Icon name="md-checkmark-sharp" color={background} />}
            </View>
          )}
          {selected && <View style={[mediumStyle.overlay]} />}
        </ImageBackground>
        <View style={[styles.padding_sm]}>
          <ThemeText
            numberOfLines={1}
            style={[styles.font_md, styles.fontWeight_700]}
          >
            {title}
          </ThemeText>
          <Text
            numberOfLines={1}
            style={[styles.font_xsm, styles.color_gray, styles.text]}
          >
            {quantifier(count, 'item')}
          </Text>
        </View>
      </Button>
    </View>
  );
};

const mediumStyle = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 2 - 15,
    borderRadius: 10,
    ...styles.boxShadowDark_sm,
  },
  thumbnail: {
    flex: 1,
    height: Dimensions.get('window').width / 2 - 15,
    overflow: 'hidden',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    ...styles.border_r_10,
  },
  select: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colors.white,
    ...styles.boxShadowDark_sm,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    ...styles.bg_darkOpacity,
  },
});
