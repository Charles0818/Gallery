import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import mediaReducer from './media';
import { settingsReducer } from './settings';

const settingsPersistConfig = {
  key: 'settings',
  storage: AsyncStorage,
  whitelist: ['theme'],
};
const allReducers = combineReducers({
  media: mediaReducer,
  settings: persistReducer(settingsPersistConfig, settingsReducer),
});

export type AppState = ReturnType<typeof allReducers>;
export default allReducers;
