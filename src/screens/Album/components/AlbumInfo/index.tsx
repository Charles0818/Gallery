import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Album, PhotoIdentifier } from '@react-native-community/cameraroll';
import { AppState, formatFileSize, quantifier } from '../../../../helpers';
import { colors, styles } from '../../../../styles';
import { GrayText, Section, ThemeText } from '../../../components';

type HeaderType = {
  albumName: string;
};
export const AlbumInfo: React.FC<HeaderType> = memo(
  ({ albumName }): JSX.Element => {
    const {
      colors: { text, card },
    } = useTheme();
    const { album, albumSize } = useSelector((state: AppState) => {
      const album: Album | undefined = state.media.albums.find(
        (album) => album.title === albumName,
      );
      const albumSize: number = state.media.assets[albumName].edges
        .map((album) => album.node.image.fileSize)
        .reduce((total: number, current: number | null) => {
          if (!current) return total;
          return total + current;
        }, 0);
      return {
        album,
        albumSize,
      };
    });
    return (
      <View
        style={[
          infoStyle.container,
          styles.justifyContent_center,
          {
            height: 150,
            backgroundColor: card,
          },
          styles.padding_sm,
          styles.marginBottom_sm,
        ]}>
        <Section style={[styles.paddingHorizontal_md]}>
          <ThemeText style={[styles.font_xlg, styles.fontWeight_700]}>
            {albumName}
          </ThemeText>
          <GrayText style={[styles.font_sm]}>{`${
            album && quantifier(album.count, 'item')
          } | ${albumSize && formatFileSize(albumSize)}`}</GrayText>
        </Section>
      </View>
    );
  },
);

const infoStyle = StyleSheet.create({
  container: {
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
});
