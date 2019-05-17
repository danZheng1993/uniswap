import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import { actionTypes } from 'store/actions/transaction';
import { set } from 'lodash';

const initialState = {
  data: {},
};

export default handleActions(
  {
    [actionTypes.ADD_TRANSACTION_DATA]: (state, action) =>
      produce(state, draft => {
        const { payload } = action;
        draft.data = {...state.data, ...payload};
      }),
    [actionTypes.CREATE_TRANSACTION]: (state, action) =>
      produce(state, draft => {
        const { id } = action.payload;
        draft.data = state.data;
        set(draft.data, id, action.payload);
      }),
  },
  initialState
);
