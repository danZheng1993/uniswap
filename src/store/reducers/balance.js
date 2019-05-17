import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import { actionTypes } from 'store/actions/balance';
import { get, set, isEmpty } from 'lodash';

const initialState = {
  data: {},
};

export default handleActions(
  {
    [actionTypes.ADD_BALANCE_DATA]: (state, action) =>
      produce(state, draft => {
        const { payload } = action;
        draft.data = {...state.data};
        const ids = Object.keys(payload);
        ids.forEach(id => {
          set(draft.data, id, get(payload, id));
        })
      }),
    [actionTypes.EXCHANGE_TOKEN]: (state, action) =>
      produce(state, draft => {
        const { payload: { buyerBalanceId, sellerBalanceId, exchangeAmount } } = action;
        const buyerBalance = {...get(state.data, buyerBalanceId, {})};
        let buyerBoughtToken = get(buyerBalance, 'ethBought', 0);
        const sellerBalance = {...get(state.data, sellerBalanceId, {})};
        let sellerSoldToken = get(sellerBalance, 'ethSold', 0);
        if (!isEmpty(buyerBalance) && !isEmpty(sellerBalance)) {
          const tempData = {...state.data};
          buyerBoughtToken += exchangeAmount;
          sellerSoldToken += exchangeAmount;
          set(buyerBalance, 'ethBought', buyerBoughtToken);
          set(sellerBalance, 'ethSold', sellerSoldToken);
          set(tempData, buyerBalance.id, buyerBalance);
          set(tempData, sellerBalance.id, sellerBalance);
          draft.data = tempData;
        }
      }),
  },
  initialState
);
