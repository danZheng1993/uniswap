import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import { get, set } from 'lodash';
import { actionTypes } from 'store/actions/users';

const initialState = {
  data: [],
  status: "",
  error: null,
};

export default handleActions(
  {
    [actionTypes.FETCH_DATA]: (state) =>
      produce(state, draft => {
        draft.status = actionTypes.FETCH_DATA;
        draft.error = null;
      }),
    [actionTypes.FETCH_DATA_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { payload } = action;
        draft.data = {...state.data, ...payload};
        draft.status = actionTypes.FETCH_DATA_SUCCESS;
        draft.error = null;
      }),
    [actionTypes.FETCH_DATA_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.status = actionTypes.FETCH_DATA_FAILURE;
        draft.error = action.payload;
      }),
    [actionTypes.ADD_TRANSACTION_HISTORY]: (state, action) =>
      produce(state, draft => {
        const { userId, txId } = action.payload;
        draft.data = state.data;
        const transactions= get(state.data, userId, 'transactions');
        set(draft.data, `${userId}.transactions`, [...transactions, txId]);
      })
  },
  initialState
);
