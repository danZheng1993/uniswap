import { takeEvery, call, select, put } from 'redux-saga/effects';
import { get } from 'lodash';
import uniqid from 'uniqid';

import { QUERY_USER } from 'ApolloAPI/queries';

import { actionTypes as userActionTypes } from 'store/actions/users';
import { actionTypes as balanceActionTypes } from 'store/actions/balance';
import { actionTypes as transactionActionTypes } from 'store/actions/transaction';
import { getLastUserPointer } from 'store/selectors/users';
import { getBalanceInfo } from 'store/selectors/balance';

import { parseUserData } from 'utils/data';

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
      const { usersData, balanceData, transactionData } = parseUserData(get(result, 'data.users'));
      yield put({ type: userActionTypes.FETCH_DATA_SUCCESS, payload: usersData });
      yield put({ type: balanceActionTypes.ADD_BALANCE_DATA, payload: balanceData });
      yield put({ type: transactionActionTypes.ADD_TRANSACTION_DATA, payload: transactionData });
    } catch (err) {
      yield put({ type: userActionTypes.FETCH_DATA_FAILURE, payload: err });
    }
  } else {
    yield put({ type: userActionTypes.FETCH_DATA_FAILURE, payload: { reason: 'client not configured' } });
  }
}

function* exchangeBalance(action) {
  const { sellerBalanceId, buyerBalanceId, exchangeAmount } = action.payload;
  const sellerBalance = yield select(getBalanceInfo, sellerBalanceId);
  const buyerBalance = yield select(getBalanceInfo, buyerBalanceId);
  const sellerId = get(sellerBalance, 'userAddress');
  const buyerId = get(buyerBalance, 'userAddress');
  const sellerExchangeAddress = get(sellerBalance, 'exchangeAddress');
  const buyerExchangeAddress = get(buyerBalance, 'exchangeAddress');
  const sendingTransaction = {
    id: uniqid(),
    exchangeAddress: sellerExchangeAddress,
    tokenAmount: -exchangeAmount,
    user: sellerId,
    fee: 0,
    tx: '',
    event: '',
    block: '',
    timestamp: '',
    tokenSymbol: '',
    ethAmount: 0,
  };
  const receivingTransaction = {
    id: uniqid(),
    exchangeAddress: buyerExchangeAddress,
    tokenAmount: exchangeAmount,
    user: buyerId,
    fee: 0,
    tx: '',
    event: '',
    block: '',
    timestamp: '',
    tokenSymbol: '',
    ethAmount: 0,
  };
  yield put({
    type: transactionActionTypes.CREATE_TRANSACTION,
    payload: sendingTransaction
  });
  yield put({
    type: transactionActionTypes.CREATE_TRANSACTION,
    payload: receivingTransaction
  });
  yield put({
    type: userActionTypes.ADD_TRANSACTION_HISTORY,
    payload: { txId: sendingTransaction.id, userId: sellerId }
  })
  yield put({
    type: userActionTypes.ADD_TRANSACTION_HISTORY,
    payload: { txId: receivingTransaction.id, userId: buyerId }
  })
}

export default function* DataSaga() {
  yield takeEvery(userActionTypes.FETCH_DATA, fetchUserData);
  yield takeEvery(balanceActionTypes.EXCHANGE_TOKEN, exchangeBalance);
}
