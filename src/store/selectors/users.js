import { createSelector } from 'reselect';

export const userSelector = state => state.users.data;
export const getLastUserPointer = createSelector(
  userSelector,
  (users = []) => {
    if (users.length === 0) {
      return '0';
    }
    const lastItem = users[users.length - 1];
    return lastItem.id;
  }
);
