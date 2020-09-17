import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  ViewToken,
  View,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from 'react-native';
import { connect } from 'react-redux';
import { Screen, Section, EllipsisMenu, Button, ThemeText } from '../components';
import { colors, styles } from '../../styles';
import { RootStackProp } from '../../types';
import { AppState } from '../../helpers';
import {
  IPhoto,
  PictureFrame,
  Overlay,
  Header,
  TabBottomButtons,
} from './components';

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
  const [photos] = useState<IPhoto[]>(getAlbumPhotos(albumName));
  const initialIndex: number = photos.findIndex((photo) => photo.uri === uri);
  console.log('initialIndex', initialIndex);
  const [currentPhoto, setCurrentPhoto] = useState<IPhoto>(photos[initialIndex]);
  const [overlayDisplay, setOverlayDisplay] = useState<boolean>(true);
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
    setCurrentPhoto(changed[0].item);
    navigation.setParams({
      uri: changed[0].item.uri, //check this out
    });
  };
  const toggleOverlay = (): void => {
    console.log('toggleOverlay function got triggered!');
    setOverlayDisplay((prev) => !prev);
  };
  return (
    <Screen>
      {overlayDisplay && <Header filename={currentPhoto.filename} />}
      <EllipsisMenu>
        <Button style={[styles.padding_sm]}>
          <ThemeText style={[styles.font_sm]}>Set as</ThemeText>
        </Button>
        <Button style={[styles.padding_sm]}>
          <ThemeText style={[styles.font_sm]}>Move to album</ThemeText>
        </Button>
        <Button style={[styles.padding_sm]}>
          <ThemeText style={[styles.font_sm]}>Copy to album</ThemeText>
        </Button>
        <Button style={[styles.padding_sm]}>
          <ThemeText style={[styles.font_sm]}>Move to secure</ThemeText>
        </Button>
        <Button style={[styles.padding_sm]}>
          <ThemeText style={[styles.font_sm]}>File info</ThemeText>
        </Button>
      </EllipsisMenu>
      <FlatList
        alwaysBounceHorizontal
        horizontal
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={initialIndex}
        data={photos}
        renderItem={({ item }) => (
          <PictureFrame {...item} toggleOverlay={toggleOverlay} />
        )}
        keyExtractor={(item) => item.uri}
        numColumns={1}
        initialNumToRender={30}
        pagingEnabled
        getItemLayout={(data, index) => ({
          length: Dimensions.get('window').width,
          offset: Dimensions.get('window').width * index,
          index,
        })}

        // onViewableItemsChanged={onViewableItemsChanged}
        // viewabilityConfig={{
        //   itemVisiblePercentThreshold: 50,
        // }}
      />
      {overlayDisplay && <TabBottomButtons />}
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
