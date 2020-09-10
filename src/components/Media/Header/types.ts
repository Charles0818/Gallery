import { Album, PhotoIdentifier } from '@react-native-community/cameraroll';

export interface ISelectedAlbums {
  selectedAlbums: Album[];
}
export interface IAddAlbum {
  addAlbum: (album: Album) => void;
}
export interface IRemoveAlbum {
  removeAlbum: (title: string) => void;
}
export interface IEmptySelectedAlbums {
  emptySelectedAlbums: () => void;
}
export interface ICountAssets {
  countAssets: () => string;
}
export interface IsSelected {
  isSelected: (title: string) => boolean;
}
export interface IHasSelection {
  hasSelection?: boolean;
}

export interface ISelectedAssets {
  selectedAssets: PhotoIdentifier[];
}
export interface IAddAsset {
  addAsset: (asset: PhotoIdentifier) => void;
}
export interface IRemoveAsset {
  removeAsset: (uri: string) => void;
}
export interface IEmptySelectedAssets {
  emptySelectedAssets: () => void;
}
export interface IAssetIsSelected {
  isSelected: (uri: string) => boolean;
}
export type SelectedAlbumsType = IAddAlbum &
  IRemoveAlbum &
  IEmptySelectedAlbums &
  ICountAssets &
  IsSelected &
  IHasSelection &
  ISelectedAlbums;

export type SelectedAssetsType = ISelectedAssets &
  IAddAsset &
  IRemoveAsset &
  IEmptySelectedAssets &
  IHasSelection &
  ICountAssets &
  IAssetIsSelected;
