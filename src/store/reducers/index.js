import { combineReducers } from 'redux';

import users from './users';
import balance from './balance';
import transaction from './transaction';

const rootReducer = combineReducers({
  users,
  balance,
  transaction,
});

export default rootReducer;
