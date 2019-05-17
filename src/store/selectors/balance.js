import { createSelector } from 'reselect';
import { get } from 'lodash';

export const getBalances = state => get(state, 'balance.data', {});
export const getBalanceInfo = balanceId => createSelector(
  getBalances,
  balances => get(balances, balanceId, {})
);