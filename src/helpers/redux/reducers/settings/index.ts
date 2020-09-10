import { SettingsType, settings, themeValues } from '../../types';

const { SET_THEME } = settings;
export interface ISettingsReducer {
  theme: themeValues;
}
const initialState: ISettingsReducer = {
  theme: themeValues.dark,
};
export const settingsReducer = (
  prevState = initialState,
  { type, payload }: SettingsType,
): ISettingsReducer => {
  switch (type) {
    case SET_THEME:
      prevState.theme = payload.theme;
    default:
      return prevState;
  }
};
