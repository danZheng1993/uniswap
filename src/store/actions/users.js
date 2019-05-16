import { createAction } from 'redux-actions';

export const actionTypes = {
  FETCH_DATA: '[DATA] - Fetch new data',
  FETCH_DATA_SUCCESS: '[DATA] - Fetch new data success',
  FETCH_DATA_FAILURE: '[DATA] - Fetch new data failure',
};

export const FetchData = createAction(actionTypes.FETCH_DATA);
