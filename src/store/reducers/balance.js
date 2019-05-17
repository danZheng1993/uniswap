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
        draft.data = {...state.data, ...payload};
      }),
    [actionTypes.EXCHANGE_TOKEN]: (state, action) =>
      produce(state, draft => {
        const { payload: { buyerBalanceId, sellerBalanceId, exchangeAmount } } = action;
        const buyerBalance = {...get(state, buyerBalanceId, {})};
        let buyerBoughtToken = get(buyerBalance, 'tokensBought', 0);
        const sellerBalance = {...get(state, sellerBalanceId, {})};
        let sellerSoldToken = get(sellerBalance, 'tokensSold', 0);
        if (!isEmpty(buyerBalance) && !isEmpty(sellerBalance)) {
          buyerBoughtToken += exchangeAmount;
          sellerSoldToken += exchangeAmount;
          set(buyerBalance, 'tokensBought', buyerBoughtToken);
          set(sellerBalance, 'tokensSold', sellerSoldToken);
        }
      }),
  },
  initialState
);
