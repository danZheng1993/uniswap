import { takeEvery, select, put } from 'redux-saga/effects';
import { get } from 'lodash';
import uniqid from 'uniqid';

import { actionTypes as userActionTypes } from 'store/actions/users';
import { actionTypes as balanceActionTypes } from 'store/actions/balance';
import { actionTypes as transactionActionTypes } from 'store/actions/transaction';
import { getBalanceInfo } from 'store/selectors/balance';

function* exchangeBalance(action) {
  const { sellerBalanceId, buyerBalanceId, exchangeAmount, buyerId, sellerId } = action.payload;
  const sellerBalance = yield select(getBalanceInfo, sellerBalanceId);
  const buyerBalance = yield select(getBalanceInfo, buyerBalanceId);
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
    __typename: 'Transaction',
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
    __typename: 'Transaction',
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
    payload: { txId: sendingTransaction.id, userId: sellerId, amount: -exchangeAmount }
  })
  yield put({
    type: userActionTypes.ADD_TRANSACTION_HISTORY,
    payload: { txId: receivingTransaction.id, userId: buyerId, amount: exchangeAmount }
  })
}

export default function* DataSaga() {
  yield takeEvery(balanceActionTypes.EXCHANGE_TOKEN, exchangeBalance);
}
