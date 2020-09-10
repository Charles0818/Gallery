import {
  StackNavigationOptions,
  StackNavigationProp,
  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Albums: undefined;
  Album: {
    albumName: string;
  };
  VideoPlayer: undefined;
  PhotoViewer: {
    albumName: string;
    uri: string;
  };
};

export type RootStackProp<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};
