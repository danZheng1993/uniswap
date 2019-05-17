import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import { actionTypes } from 'store/actions/transaction';
import { set, get } from 'lodash';
import { gql } from 'apollo-boost';

import { cache } from 'ApolloAPI/client';

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
        const { id, user } = action.payload;
        const newData = state.data;
        set(newData, id, action.payload);
        const txIds = Object.keys(newData);
        const txs = txIds.map(txId => get(newData, txId));
        draft.data = newData;
        cache.writeFragment({
          id: user,
          fragment: gql`
            fragment myUser on User {
              txs
            }
          `,
          data: { __typename: 'User', txs }
        });
        console.log(cache);
      }),
  },
  initialState
);
