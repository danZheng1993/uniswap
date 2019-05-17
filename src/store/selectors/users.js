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
        balance: user.tokensBought - user.tokensSold
      };
    })
  }
);

// export const getUserDetails = userId => createSelector(
//   userDataSelector, getBalances, getTransactions,
//   (userData, getBalances, getTransactions) => {
//     const userInfo = get(userData, userId);
//     const 
//   }
// )