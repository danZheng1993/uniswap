import { createSelector } from 'reselect';
import { get } from 'lodash';

import { getBalances } from './balance';
import { getTransactions } from './transactions';

export const userDataSelector = state => state.users.data;

export const getLastUserPointer = state => {
  const users = state.users.data;
  const ids = Object.keys(users);
  if (ids.length === 0) {
    return '0';
  }
  return ids[ids.length - 1];
};

export const parseUserData = createSelector(
  userDataSelector,
  (userData) => {
    const ids = Object.keys(userData);
    return ids.map(id => {
      const user = get(userData, id);
      return {
        ...user,
        balance: user.ethBought - user.ethSold
      };
    })
  }
);

export const getUserDetailsSelector = createSelector(
  userDataSelector, getBalances, getTransactions,
  (userData, balanceData, transactionData) => (userId) => {
    const userInfo = get(userData, userId);
    const balances = get(userInfo, 'balances');
    const txs = get(userInfo, 'transactions');
    const balanceDetails = balances.map(balanceId => get(balanceData, balanceId));
    const txDetails = txs.map(txId => get(transactionData, txId));
    return {
      ...userInfo,
      balances: balanceDetails,
      transactions: txDetails,
    }
  }
);

export const getSelectableUsers = createSelector(
  userDataSelector,
  userData => userId => {
    const userIds = Object.keys(userData);
    const selectableIds = userIds.filter(uId => uId !== userId);
    return selectableIds.map(uId => get(userData, uId));
  }
);
