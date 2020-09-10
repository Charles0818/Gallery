import { SetThemeAction, settings, themeValues } from '../../types';

const { SET_THEME } = settings;

export const setTheme = (theme: themeValues): SetThemeAction => {
  return {
    type: SET_THEME,
    payload: {
      theme,
    },
  };
};
