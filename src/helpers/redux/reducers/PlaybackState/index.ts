import { PlaybackStateType, playbackState } from '../../types';

const {
  LOAD_MUSIC,
  LOAD_VIDEO,
  UPDATE_MUSIC_DURATION,
  UPDATE_VIDEO_DURATION,
} = playbackState;

export interface IPlaybackStateReducer {
  music: {
    uri?: string;
    playlist?: string;
    title?: string;
    duration?: number;
  };
  videos: IVideo;
}

interface IVideo {
  [videoTitle: string]: {
    duration?: number;
  };
}

const initialState: IPlaybackStateReducer = {
  music: {},
  videos: {},
};

export const PlaybackStateReducer = (
  prevState = initialState,
  { type, payload }: PlaybackStateType,
): IPlaybackStateReducer => {
  switch (type) {
    case LOAD_MUSIC:
      prevState.music = payload;
      return {
        ...prevState,
      };
    case UPDATE_MUSIC_DURATION: {
      const { title, duration } = payload;
      prevState.music = {
        ...prevState.music,
        title,
        duration,
      };
      return {
        ...prevState,
      };
    }
    case LOAD_VIDEO: {
      const { title, duration } = payload;
      prevState.videos[title] = {
        duration,
      };
      return {
        ...prevState,
      };
    }
    case UPDATE_VIDEO_DURATION:
      const { title, duration } = payload;
      prevState.videos[title] = {
        duration,
      };
      return {
        ...prevState,
      };
    default:
      return prevState;
  }
};
