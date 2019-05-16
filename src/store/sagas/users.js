import { takeEvery, call, select, put } from 'redux-saga/effects';
import { get } from 'lodash';

import { actionTypes } from 'store/actions/users';
import { getLastUserPointer } from 'store/selectors/users';
import { QUERY_USER } from 'ApolloAPI/queries';

function* fetchUserData(action) {
  const client = action.payload;
  if (client) {
    try {
      const queryPoint = yield select(getLastUserPointer);
      const request = {
        query: QUERY_USER,
        variables: { id: queryPoint }
      }
      const result = yield call(client.query, request);
      yield put({ type: actionTypes.FETCH_DATA_SUCCESS, payload: get(result, 'data.users') });
    } catch (err) {
      yield put({ type: actionTypes.FETCH_DATA_FAILURE, payload: err });
    }
  } else {
    yield put({ type: actionTypes.FETCH_DATA_FAILURE, payload: { reason: 'client not configured' } });
  }
}

export default function* UserSaga() {
  yield takeEvery(actionTypes.FETCH_DATA, fetchUserData);
}
