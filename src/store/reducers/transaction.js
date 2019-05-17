import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import { actionTypes } from 'store/actions/transaction';
import { set, get } from 'lodash';

const initialState = {
  data: {},
};

export default handleActions(
  {
    [actionTypes.ADD_TRANSACTION_DATA]: (state, action) =>
      produce(state, draft => {
        const { payload } = action;
        draft.data = {...state.data};
        const ids = Object.keys(payload);
        ids.forEach(id => {
          set(draft.data, id, get(payload, id));
        })
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
