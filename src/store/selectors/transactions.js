import { createSelector } from 'reselect';
import { get } from 'lodash';

export const getTransactions = state => get(state, 'transaction.data', {});
export const getTransactionInfo = txId => createSelector(
  getTransactions,
  transactions => get(transactions, txId, {})
);