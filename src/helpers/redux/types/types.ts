export const media: { [type: string]: string } = {
  GET_ALBUMS_REQUEST: 'GET_ALBUMS_REQUEST',
  GET_ALBUMS_SUCCESS: 'GET_ALBUMS_SUCCESS',
  GET_ALBUMS_FAILURE: 'GET_ALBUMS_FAILURE',
  GET_ASSETS_REQUEST: 'GET_ASSETS_REQUEST',
  GET_ASSETS_SUCCESS: 'GET_ASSETS_SUCCESS',
  GET_ASSETS_FAILURE: 'GET_ASSETS_FAILURE',
};

export const playbackState: { [type: string]: string } = {
  LOAD_MUSIC: 'LOAD_MUSIC',
  UPDATE_MUSIC_DURATION: 'UPDATE_MUSIC_DURATION',
  LOAD_VIDEO: 'LOAD_VIDEO',
  UPDATE_VIDEO_DURATION: 'UPDATE_VIDEO_DURATION',
};

export const settings: { [type: string]: string } = {
  SET_THEME: 'SET_THEME',
};
