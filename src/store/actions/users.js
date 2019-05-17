import { createAction } from 'redux-actions';

export const actionTypes = {
  ADD_DATA: '[USER] - Add new data',
  ADD_TRANSACTION_HISTORY: '[USER] - Add Transaction History',
};

export const AddData = createAction(actionTypes.ADD_DATA);
