import { all, fork } from 'redux-saga/effects';

import UserSaga from './users';

export default function* mainSaga() {
  yield all([
    fork(UserSaga),
  ]);
}
