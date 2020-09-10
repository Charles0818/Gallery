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
  PhotoIdentifiersPage,
} from '@react-native-community/cameraroll';
import { all, call, put, spawn, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  getAlbumsFailure,
  getAlbumsSuccess,
  getAssetsFailure,
  getAssetsRequest,
  getAssetsSuccess,
} from '../../actions';
import { GetAlbumsRequestAction, GetAssetsRequestAction, media } from '../../types';

// Array.prototype.asyncForEach = async function(callback: (...arg: any[]) => void, thisArg?: any) {
//   thisArg = thisArg || this;
//   for(let i = 0, l = this.length; i !== l; ++i) {
//     await callback.call(thisArg, this[i], i, this)
//   }
// }

const { GET_ASSETS_REQUEST, GET_ALBUMS_REQUEST } = media;
export const hasAndroidPermission = async (): Promise<boolean> => {
  const permission: Permission =
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  const hasPermission: boolean = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }
  const status: PermissionStatus = await PermissionsAndroid.request(permission);
  return status === 'granted';
};

export const getAlbumsAsync = async (
  assetType: AssetType = 'All',
): Promise<Album[]> => {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    throw 'Permission Denied!';
  }
  console.log('assetType', assetType);
  return CameraRoll.getAlbums({
    assetType,
  });
};

export const getPhotosAsync = async ({
  first = 500,
  after,
  groupTypes = 'All',
  include = ['filename', 'fileSize', 'imageSize', 'location', 'playableDuration'],
  groupName,
  assetType = 'All',
}: GetPhotosParams): Promise<PhotoIdentifiersPage> => {
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

export const deletePhotosAsync = async (photoUris: string[]): Promise<boolean> => {
  if (Platform.OS === 'android' && !(await hasAndroidPermission()))
    throw 'Permission Denied!';
  return CameraRoll.deletePhotos(photoUris);
};

function* getAssets({ payload }: GetAssetsRequestAction): IterableIterator<any> {
  try {
    const assets: PhotoIdentifiersPage = yield call(getPhotosAsync, payload);
    console.log(
      'fileSize',
      assets.edges.map((asset) => asset.node.image.fileSize),
    );
    yield put(getAssetsSuccess(assets, payload.groupName));
  } catch (err) {
    console.log('getAssetsErr', err);
    yield put(getAssetsFailure(err));
  }
}

function* getAlbums({
  payload: { assetType },
}: GetAlbumsRequestAction): IterableIterator<any> {
  try {
    const albums: Album[] = yield call(getAlbumsAsync, assetType);
    yield put(getAlbumsSuccess(albums));
    yield all([
      ...albums.map((album) => {
        const payload = {
          groupName: album.title,
        };
        return call(getAssets, {
          payload,
        });
      }),
    ]);
  } catch (err) {
    console.log('getAssetsErr', err);
    yield put(getAlbumsFailure(err));
  }
}

function* getAssetsWatcher() {
  yield takeEvery(GET_ASSETS_REQUEST, getAssets);
}

function* getAlbumsWatcher() {
  yield takeLatest(GET_ALBUMS_REQUEST, getAlbums);
}

export default function* mediaSagas() {
  yield spawn(getAssetsWatcher);
  yield spawn(getAlbumsWatcher);
}
