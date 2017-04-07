import { combineReducers } from 'redux';
import docs from './DocumentReducers';

const RootReducer = combineReducers({
  docs
});

export default RootReducer;
