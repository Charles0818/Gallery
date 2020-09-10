import {
  Album,
  AssetType,
  PhotoIdentifiersPage,
} from '@react-native-community/cameraroll';
import {
  ErrorAction,
  GetAlbumsRequestAction,
  GetAlbumsSuccessAction,
  GetAssetsRequestAction,
  GetAssetsSuccessAction,
  media,
} from '../../types';

const {
  GET_ASSETS_REQUEST,
  GET_ALBUMS_REQUEST,
  GET_ASSETS_SUCCESS,
  GET_ALBUMS_SUCCESS,
  GET_ASSETS_FAILURE,
  GET_ALBUMS_FAILURE,
} = media;

export const getAlbumsRequest = (assetType?: AssetType): GetAlbumsRequestAction => {
  return {
    type: GET_ALBUMS_REQUEST,
    payload: {
      assetType,
    },
  };
};
export const getAlbumsSuccess = (albums: Album[]): GetAlbumsSuccessAction => {
  return {
    type: GET_ALBUMS_SUCCESS,
    payload: {
      albums,
    },
  };
};

export const getAlbumsFailure = (error: string): ErrorAction => {
  return {
    type: GET_ALBUMS_FAILURE,
    payload: {
      error,
    },
  };
};

export const getAssetsRequest = (
  groupName: string,
  after?: string,
): GetAssetsRequestAction => {
  return {
    type: GET_ASSETS_REQUEST,
    payload: {
      groupName,
      after,
    },
  };
};

export const getAssetsSuccess = (
  assets: PhotoIdentifiersPage,
  albumTitle: string,
): GetAssetsSuccessAction => {
  return {
    type: GET_ASSETS_SUCCESS,
    payload: {
      assets,
      albumTitle,
    },
  };
};

export const getAssetsFailure = (error: string): ErrorAction => {
  return {
    type: GET_ASSETS_FAILURE,
    payload: {
      error,
    },
  };
};
