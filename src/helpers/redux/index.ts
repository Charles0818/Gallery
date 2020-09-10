import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import allReducers, { AppState } from './reducers';
import rootSaga from './sagas';
import * as types from './types';
import * as actions from './actions';

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(allReducers, applyMiddleware(sagaMiddleWare));

const persistor = persistStore(store);
sagaMiddleWare.run(rootSaga);

export { types, store, persistor, actions, AppState };
