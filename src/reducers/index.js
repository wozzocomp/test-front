import { combineReducers } from 'redux';
import general from './general';
import user from './user';

const rootReducer = combineReducers({
  general,
  user,
});

export default rootReducer;
