import { all, fork } from 'redux-saga/effects';

import DataSaga from './data';

export default function* mainSaga() {
  yield all([
    fork(DataSaga),
  ]);
}
