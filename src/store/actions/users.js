import { createAction } from 'redux-actions';

export const actionTypes = {
  FETCH_DATA: '[USER] - Fetch new data',
  FETCH_DATA_SUCCESS: '[USER] - Fetch new data success',
  FETCH_DATA_FAILURE: '[USER] - Fetch new data failure',
  ADD_TRANSACTION_HISTORY: '[USER] - Add Transaction History',
};

export const FetchData = createAction(actionTypes.FETCH_DATA);
