import { spawn } from 'redux-saga/effects';
import mediaSagas from './media';

export default function* rootSaga() {
  yield spawn(mediaSagas);
}
