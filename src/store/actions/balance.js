import { createAction } from 'redux-actions';

export const actionTypes = {
  ADD_BALANCE_DATA: '[BALANCE] - Add Balance Data',
  EXCHANGE_TOKEN: '[BALANCE] - Exchange Token'
};

export const AddBalanceData = createAction(actionTypes.ADD_BALANCE_DATA);
export const ExchangeToken = createAction(actionTypes.EXCHANGE_TOKEN);