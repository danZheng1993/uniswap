import { createAction } from 'redux-actions';

export const actionTypes = {
  ADD_TRANSACTION_DATA: '[TRANSACTION] - Add Transaction Data',
  CREATE_TRANSACTION: '[TRANSACTION] - Create Transaction'
};

export const AddTransactionData = createAction(actionTypes.ADD_TRANSACTION_DATA);
export const CreateTransaction = createAction(actionTypes.CREATE_TRANSACTION);
