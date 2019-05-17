import { createSelector } from 'reselect';
import { get } from 'lodash';

export const getBalances = state => get(state, 'balance.data', {});

export const getBalanceInfo = createSelector(
  getBalances,
  balances => balanceId => get(balances, balanceId, {})
);

export const getSelectableBalance = createSelector(
  getBalances,
  balances => userId => {
    const balanceIds = Object.keys(balances);
    const selectableOptions = [];
    balanceIds.forEach(bId => {
      if (get(balances, `${bId}.userAddress`) === userId) {
        selectableOptions.push(get(balances, bId));
      }
    });
    return selectableOptions;
  }
)
