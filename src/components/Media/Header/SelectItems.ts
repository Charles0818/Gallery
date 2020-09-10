import { useCallback, useEffect, useState } from 'react';
import { Album, PhotoIdentifier } from '@react-native-community/cameraroll';
import { quantifier } from '../../../helpers';
import { SelectedAlbumsType, SelectedAssetsType } from './types';

export const useSelectedAlbums = (): SelectedAlbumsType => {
  const [selectedAlbums, setSelectedAlbums] = useState<Album[]>([]);
  let hasSelection: boolean = selectedAlbums.length > 0;
  useEffect(() => {
    hasSelection = selectedAlbums.length > 0;
  }, [selectedAlbums.length]);
  const countAssets = useCallback((): string => {
    const totalAssets = selectedAlbums.reduce((total, album) => {
      return total + album.count;
    }, 0);
    const stringifyCount: string = `${quantifier(
      selectedAlbums.length,
      'album',
    )} (${quantifier(totalAssets, 'item')})`;
    return stringifyCount;
  }, [selectedAlbums]);

  const addAlbum = (album: Album): void => {
    setSelectedAlbums((prev) => [...prev, album]);
  };
  const removeAlbum = (title: string): void => {
    setSelectedAlbums((prev) => prev.filter((album) => album.title !== title));
  };

  const emptySelectedAlbums = (): void => setSelectedAlbums([]);
  const isSelected = (title: string): boolean => {
    const response = selectedAlbums.find((album) => album.title === title);
    return response !== undefined;
  };

  return {
    selectedAlbums,
    hasSelection,
    countAssets,
    addAlbum,
    removeAlbum,
    emptySelectedAlbums,
    isSelected,
  };
};

export const useSelectedAssets = (): SelectedAssetsType => {
  const [selectedAssets, setSelectedAssets] = useState<PhotoIdentifier[]>([]);
  let hasSelection: boolean = selectedAssets.length > 0;
  useEffect(() => {
    hasSelection = selectedAssets.length > 0;
  }, [selectedAssets.length]);

  const countAssets = (): string => `${quantifier(selectedAssets.length, 'item')}`;

  const addAsset = (asset: PhotoIdentifier): void => {
    setSelectedAssets((prev) => [...prev, asset]);
  };
  const removeAsset = (uri: string) => {
    setSelectedAssets((prev) =>
      prev.filter((asset) => asset.node.image.uri !== uri),
    );
  };

  const emptySelectedAssets = (): void => setSelectedAssets([]);
  const isSelected = (uri: string): boolean => {
    const response = selectedAssets.find((asset) => asset.node.image.uri === uri);
    return response !== undefined;
  };
  return {
    selectedAssets,
    hasSelection,
    countAssets,
    addAsset,
    removeAsset,
    emptySelectedAssets,
    isSelected,
  };
};
