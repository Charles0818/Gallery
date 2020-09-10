import {
  Album,
  AssetType,
  PhotoIdentifiersPage,
} from '@react-native-community/cameraroll';
import { media, playbackState, settings } from './types';

const {
  GET_ASSETS_REQUEST,
  GET_ALBUMS_REQUEST,
  GET_ASSETS_SUCCESS,
  GET_ALBUMS_SUCCESS,
  GET_ASSETS_FAILURE,
  GET_ALBUMS_FAILURE,
} = media;
const {
  LOAD_MUSIC,
  LOAD_VIDEO,
  UPDATE_MUSIC_DURATION,
  UPDATE_VIDEO_DURATION,
} = playbackState;
const { SET_THEME } = settings;
export interface ErrorAction {
  type: typeof GET_ASSETS_FAILURE | typeof GET_ALBUMS_FAILURE;
  payload: {
    error: string;
  };
}

export interface GetAlbumsRequestAction {
  type: typeof GET_ALBUMS_REQUEST;
  payload: {
    assetType: AssetType | undefined;
  };
}

export interface GetAlbumsSuccessAction {
  type: typeof GET_ALBUMS_SUCCESS;
  payload: {
    albums: Album[];
  };
}

export interface GetAssetsRequestAction {
  type: typeof GET_ASSETS_REQUEST;
  payload: {
    groupName: string;
    after?: string;
  };
}

export interface GetAssetsSuccessAction {
  type: typeof GET_ASSETS_SUCCESS;
  payload: {
    albumTitle: string;
    assets: PhotoIdentifiersPage;
  };
}

export interface MusicPlaybackState {
  type: typeof LOAD_MUSIC | typeof UPDATE_MUSIC_DURATION;
  payload: {
    playlist?: string;
    uri?: string;
    title: string;
    duration: number;
  };
}

export interface VideoPlaybackState {
  type: typeof LOAD_VIDEO | typeof UPDATE_VIDEO_DURATION;
  payload: {
    title: string;
    duration: number;
  };
}
export enum themeValues {
  dark = 'Dark',
  light = 'Light',
}

export interface SetThemeAction {
  type: typeof SET_THEME;
  payload: {
    theme: themeValues;
  };
}
export type SettingsType = SetThemeAction;
export type PlaybackStateType = MusicPlaybackState & VideoPlaybackState;
export type AlbumActionTypes = GetAlbumsRequestAction & GetAlbumsSuccessAction;
export type AssetActionTypes = GetAssetsRequestAction & GetAssetsSuccessAction;
export type AppActions = AlbumActionTypes &
  AssetActionTypes &
  SettingsType &
  ErrorAction &
  PlaybackStateType;
