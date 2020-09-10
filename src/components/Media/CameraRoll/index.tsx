import {
  Permission,
  PermissionStatus,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import CameraRoll, {
  Album,
  AssetType,
  GetPhotosParams,
} from '@react-native-community/cameraroll';

export const hasAndroidPermission = async () => {
  const permission: Permission =
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  const hasPermission: boolean = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }
  const status: PermissionStatus = await PermissionsAndroid.request(permission);
  return status === 'granted';
};

export const getAlbums = async (assetType: AssetType = 'All') => {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    throw 'Permission Denied!';
  }
  return CameraRoll.getAlbums({
    assetType,
  });
};

export const getPhotos = async ({
  first = 20,
  after,
  groupTypes = 'Album',
  include = ['filename', 'fileSize', 'imageSize', 'location', 'playableDuration'],
  groupName,
  assetType = 'All',
}: GetPhotosParams) => {
  if (Platform.OS === 'android' && !(await hasAndroidPermission()))
    throw 'Permission Denied!';
  return CameraRoll.getPhotos({
    first,
    after,
    groupTypes,
    include,
    groupName,
    assetType,
  });
};

export const deletePhotos = async (photoUris: string[]) => {
  if (Platform.OS === 'android' && !(await hasAndroidPermission()))
    throw 'Permission Denied!';
  return CameraRoll.deletePhotos(photoUris);
};
