import React, { useState } from 'react';
import { Dimensions, FlatList, ViewToken } from 'react-native';
import { connect } from 'react-redux';
import { Screen, Section } from '../components';
import { colors, styles } from '../../styles';
import { RootStackProp } from '../../types';
import { AppState } from '../../helpers';
import { IPhoto, PictureFrame } from './components';

type PhotoViewerType = RootStackProp<'PhotoViewer'> & {
  getAlbumPhotos: (albumName: string) => IPhoto[];
};

const PhotoViewer = ({
  getAlbumPhotos,
  navigation,
  route: {
    params: { albumName, uri },
  },
}: PhotoViewerType): JSX.Element => {
  const [photos, setPhotos] = useState<IPhoto[]>(getAlbumPhotos(albumName));
  const initialIndex: number = photos.findIndex((photo) => photo.uri === uri);
  console.log('initialIndex', initialIndex);
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const onViewableItemsChanged = ({
    viewableItems,
    changed,
  }: {
    viewableItems: Array<ViewToken>;
    changed: Array<ViewToken>;
  }) => {
    console.log('viewableItems', viewableItems, 'changed', changed[0].item);
    navigation.setOptions({
      headerTitle: changed[0].item.filename,
    });
  };
  return (
    <Screen>
      <FlatList
        alwaysBounceHorizontal
        horizontal
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={initialIndex}
        data={photos}
        renderItem={({ item, index, separators }) => <PictureFrame {...item} />}
        keyExtractor={(item, index) => item.uri}
        numColumns={1}
        initialNumToRender={30}
        pagingEnabled
        getItemLayout={(data, index) => ({
          length: Dimensions.get('window').width,
          offset: Dimensions.get('window').width * index,
          index,
        })}
        // onScroll={example}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />
    </Screen>
  );
};

const mapStateToProps = (state: AppState) => {
  const getAlbumPhotos = (albumName: string): IPhoto[] =>
    state.media.assets[albumName].edges
      .filter((asset) => asset.node.image.playableDuration === null)
      .map((asset) => ({
        ...asset.node.image,
      }));
  return {
    getAlbumPhotos,
  };
};

export default connect(mapStateToProps, null)(PhotoViewer);
