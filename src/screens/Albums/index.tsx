import React, { memo, useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { AssetType, PhotoIdentifier } from '@react-native-community/cameraroll';
import { EmptyListRender, Screen, Section } from '../components';
import { AlbumCard, AlbumType, useSelectedAlbums } from '../../components';
import { Header } from './components';
import { colors, styles } from '../../styles';
import { RootStackProp } from '../types';
import { AppState, actions, quantifier } from '../../helpers';

const { getAlbumsRequest } = actions;

type AlbumsType = RootStackProp<'Albums'> & {
  albums: AlbumType[];
  getAlbumsRequest: (assetType?: AssetType) => void;
};
const Albums = ({
  navigation,
  getAlbumsRequest,
  albums,
}: AlbumsType): JSX.Element => {
  const {
    selectedAlbums,
    countAssets,
    hasSelection,
    emptySelectedAlbums,
    ...albumFunctions
  } = useSelectedAlbums();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          hasSelection={hasSelection}
          countAssets={countAssets}
          emptySelectedAlbums={emptySelectedAlbums}
        />
      ),
    });
  });
  // useEffect(() => {
  //   getAlbumsRequest('All')
  // }, [])
  return (
    <Screen style={[styles.flexCenter]}>
      <Section>
        <FlatList
          data={albums}
          renderItem={({ item, index, separators }) => (
            <AlbumCard
              album={item}
              key={index}
              {...albumFunctions}
              hasSelection={hasSelection}
            />
          )}
          keyExtractor={(item, index) => item.title}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={[
            {
              justifyContent: 'space-between',
            },
          ]}
          initialNumToRender={30}
          ListEmptyComponent={() => <EmptyListRender text="No Album" />}
          onEndReachedThreshold={0.25}
          refreshing={false}
          onRefresh={() => {}}
          onEndReached={() => {}}
          contentContainerStyle={[styles.marginTop_md]}
        />
      </Section>
    </Screen>
  );
};

const mapStateToProps = (state: AppState) => {
  const {
    media: { albums: stateAlbums, assets },
  } = state;
  const albums: AlbumType[] = stateAlbums.map((album) => {
    const asset: PhotoIdentifier | null = assets[album.title]
      ? assets[album.title].edges[0]
      : null;
    return {
      ...album,
      asset,
    };
  });
  return {
    albums,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getAlbumsRequest,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(Albums);
