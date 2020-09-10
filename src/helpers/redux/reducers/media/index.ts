import { Album, PhotoIdentifiersPage } from '@react-native-community/cameraroll';
import { AppActions, media } from '../../types';

const {
  GET_ASSETS_SUCCESS,
  GET_ALBUMS_SUCCESS,
  GET_ALBUMS_FAILURE,
  GET_ASSETS_FAILURE,
} = media;

export interface IAssets {
  [propName: string]: PhotoIdentifiersPage;
}
export interface IMediaReducer {
  albums: Album[];
  assets: IAssets;
  errors: {
    albums: string;
    assets: string;
  };
}

const initialState: IMediaReducer = {
  albums: [],
  assets: {},
  errors: {
    assets: '',
    albums: '',
  },
};
const mediaReducer = (
  prevState: IMediaReducer = initialState,
  { type, payload }: AppActions,
): IMediaReducer => {
  switch (type) {
    case GET_ALBUMS_SUCCESS:
      const { albums } = payload;
      return {
        ...prevState,
        albums,
      };
    case GET_ALBUMS_FAILURE:
      prevState.errors.albums = payload.error;
      return {
        ...prevState,
      };
    case GET_ASSETS_SUCCESS:
      const { albumTitle, assets } = payload;
      if (!prevState.assets[albumTitle]) {
        prevState.assets[albumTitle] = assets;
        return {
          ...prevState,
        };
      }
      const { edges, page_info } = assets;
      if (prevState.assets[albumTitle].page_info.end_cursor === page_info.end_cursor)
        return {
          ...prevState,
        };
      prevState.assets[albumTitle].edges = [
        ...prevState.assets[albumTitle].edges,
        ...edges,
      ];
      prevState.assets[albumTitle].page_info = page_info;
      return {
        ...prevState,
      };
    case GET_ASSETS_FAILURE:
      prevState.errors.assets = payload.error;
      return {
        ...prevState,
      };
    default:
      return prevState;
  }
};

export default mediaReducer;
