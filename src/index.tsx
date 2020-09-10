import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator, AsyncStorage, Linking, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { Provider, useDispatch } from 'react-redux';
import { RootStackParamList } from './types';
import { ErrorBoundary, useTheme } from './components';
import { actions, persistor, store } from './helpers';
import { colors } from './styles';
import { Album, Albums, PhotoViewer, VideoPlayer } from './screens';
import { GetAlbumsRequestAction, themeValues } from './helpers/redux/types';

const { getAlbumsRequest } = actions;
enableScreens();
export default class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <SafeAreaProvider>
          <Provider store={store}>
            <PersistGate
              persistor={persistor}
              loading={<ActivityIndicator animating color={colors.color1} />}
            >
              <NavigationRoutes />
            </PersistGate>
          </Provider>
        </SafeAreaProvider>
      </ErrorBoundary>
    );
  }
}
const Stack = createStackNavigator<RootStackParamList>();
export const NavigationRoutes: React.FC = (): JSX.Element | null => {
  const [initialState, setInitialState] = React.useState<NavigationState>();
  const [isReady, setIsReady] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isDark = useTheme() === themeValues.dark;
  const appTheme = {
    dark: isDark,
    colors: {
      primary: isDark ? colors.white : colors.dark,
      background: isDark ? colors.dark : colors.white,
      card: isDark ? colors.gray_color2 : colors.white,
      text: isDark ? colors.white : colors.dark,
      border: isDark ? colors.gray_color2 : colors.white,
    },
  };
  useLayoutEffect(() => {
    dispatch(getAlbumsRequest('All'));
  }, []);
  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl: string | null = await Linking.getInitialURL();
        if (Platform.OS !== 'web' && initialUrl === null) {
          const savedStateString: string | null = await AsyncStorage.getItem(
            'persistedRoute',
          );
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;
          console.log('savedSate', state);
          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };
    if (!isReady) restoreState();
  }, [isReady]);
  if (!isReady) return <ActivityIndicator animating color={colors.color1} />;
  return (
    <NavigationContainer
      // initialState={initialState}
      theme={appTheme}
      onStateChange={(state: NavigationState | undefined): Promise<void> =>
        AsyncStorage.setItem('persistedRoute', JSON.stringify(state))
      }
    >
      <Stack.Navigator
        initialRouteName="Albums"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          // header
        }}
      >
        <Stack.Screen
          name="Albums"
          component={Albums}
          options={
            {
              // header
            }
          }
        />
        <Stack.Screen name="Album" component={Album} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
        <Stack.Screen name="PhotoViewer" component={PhotoViewer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
