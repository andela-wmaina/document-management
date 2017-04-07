import { combineReducers } from 'redux';
import docs from './DocumentReducers';
import users from './UsersReducers';

const RootReducer = combineReducers({
  docs,
  users
});

export default RootReducer;
