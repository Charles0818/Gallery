import React, { useCallback, useLayoutEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import {
  PhotoIdentifiersPage,
  PhotoIdentifier,
} from '@react-native-community/cameraroll';
import { Screen } from '../components';
import { useSelectedAssets } from '../../components';
import { AlbumInfo, Header, RenderAssetsByMonth } from './components';
import { styles } from '../../styles';
import { RootStackProp } from '../types';
import { AppState, actions, sortAssetsByMonth } from '../../helpers';

const { getAssetsRequest } = actions;
type AlbumType = RootStackProp<'Album'> & {
  getAssetsRequest: (groupName: string, after?: string) => void;
  getAlbum: (albumName: string) => PhotoIdentifiersPage | undefined;
};
const Album: React.FC<AlbumType> = ({
  getAlbum,
  getAssetsRequest,
  navigation,
  route: { params },
}) => {
  const {
    selectedAssets,
    countAssets,
    hasSelection,
    emptySelectedAssets,
    ...assetFunctions
  } = useSelectedAssets();
  const [album] = useState<PhotoIdentifiersPage | undefined>(
    getAlbum(params.albumName),
  );
  console.log('params.albumName', params.albumName);
  if (!album) return null;
  const {
    page_info: { has_next_page, end_cursor },
    edges,
  } = album;
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          albumName={params.albumName}
          countAssets={countAssets}
          emptySelectedAssets={emptySelectedAssets}
          hasSelection={hasSelection}
        />
      ),
    });
  }, []);
  const fetchAssets = useCallback((): void => {
    has_next_page ? getAssetsRequest(params.albumName, end_cursor) : null;
  }, [has_next_page, end_cursor]);
  const sortAssets = useCallback((): [string, PhotoIdentifier[]][] => {
    return sortAssetsByMonth(edges);
  }, [edges]);
  return (
    <Screen>
      <FlatList
        data={sortAssets()}
        ListHeaderComponent={(): JSX.Element => (
          <AlbumInfo albumName={params.albumName} />
        )}
        renderItem={({ item }) => (
          <RenderAssetsByMonth groupedMonth={item} {...assetFunctions} />
        )}
        keyExtractor={(item, index) => item[0]}
        numColumns={1}
        showsVerticalScrollIndicator
        initialNumToRender={50}
        onEndReachedThreshold={0.75}
        onEndReached={fetchAssets}
        contentContainerStyle={[styles.marginBottom_md]}
      />
    </Screen>
  );
};

const mapStateToProps = (state: AppState, ownProp: any) => {
  const getAlbum = (albumName: string): PhotoIdentifiersPage | undefined =>
    state.media.assets[albumName];
  return {
    getAlbum,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getAssetsRequest,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(Album);
